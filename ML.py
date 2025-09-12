import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
import datetime
import random
import io

# Set page configuration
st.set_page_config(page_title="Telecom Inventory ML Dashboard", layout="wide")

# Function to validate CSV structure
def validate_products_df(df):
    required_columns = ['product_id', 'name', 'category', 'current_stock', 'min_stock_level', 'unit_price']
    return all(col in df.columns for col in required_columns)

def validate_suppliers_df(df):
    required_columns = ['supplier_id', 'name', 'performance_score', 'delivery_time']
    return all(col in df.columns for col in required_columns)

def validate_orders_df(df):
    required_columns = ['order_id', 'product_id', 'supplier_id', 'quantity', 'order_date']
    return all(col in df.columns for col in required_columns)

# Mock data generation function
def generate_mock_data():
    # Products data
    categories = ["Smartphones", "Routers", "Switches", "Cables", "Accessories"]
    products = []
    for i in range(1, 51):
        products.append({
            "product_id": f"PRD-{i:03d}",
            "name": f"Product {i}",
            "category": random.choice(categories),
            "current_stock": random.randint(5, 500),
            "min_stock_level": random.randint(10, 50),
            "unit_price": round(random.uniform(20, 500), 2)
        })
    
    # Suppliers data
    suppliers = []
    for i in range(1, 11):
        suppliers.append({
            "supplier_id": f"SUP-{i:03d}",
            "name": f"Supplier {i}",
            "performance_score": random.randint(60, 100),
            "delivery_time": random.randint(1, 14)
        })
    
    # Orders data (historical)
    orders = []
    start_date = datetime.datetime.now() - datetime.timedelta(days=365)
    for i in range(1000):
        order_date = start_date + datetime.timedelta(days=random.randint(0, 365))
        orders.append({
            "order_id": f"ORD-{i:03d}",
            "product_id": random.choice([p["product_id"] for p in products]),
            "supplier_id": random.choice([s["supplier_id"] for s in suppliers]),
            "quantity": random.randint(1, 50),
            "order_date": order_date,
            "delivery_date": order_date + datetime.timedelta(days=random.randint(1, 14))
        })
    
    return pd.DataFrame(products), pd.DataFrame(suppliers), pd.DataFrame(orders)

# Data loading section
def load_data():
    st.sidebar.title("Data Source")
    data_source = st.sidebar.radio("Select Data Source", ["Use Mock Data", "Upload CSV Files"])
    
    if data_source == "Use Mock Data":
        products_df, suppliers_df, orders_df = generate_mock_data()
        return products_df, suppliers_df, orders_df
    else:
        st.sidebar.markdown("### Upload CSV Files")
        
        # Upload products CSV
        products_file = st.sidebar.file_uploader("Upload Products CSV", type=["csv"])
        if products_file is not None:
            try:
                products_df = pd.read_csv(products_file)
                if validate_products_df(products_df):
                    st.sidebar.success("Products CSV uploaded successfully!")
                else:
                    st.sidebar.error("Products CSV is missing required columns. Please check the format.")
                    st.sidebar.info("Required columns: product_id, name, category, current_stock, min_stock_level, unit_price")
                    return None, None, None
            except Exception as e:
                st.sidebar.error(f"Error reading Products CSV: {str(e)}")
                return None, None, None
        else:
            st.sidebar.warning("Please upload Products CSV")
            return None, None, None
        
        # Upload suppliers CSV
        suppliers_file = st.sidebar.file_uploader("Upload Suppliers CSV", type=["csv"])
        if suppliers_file is not None:
            try:
                suppliers_df = pd.read_csv(suppliers_file)
                if validate_suppliers_df(suppliers_df):
                    st.sidebar.success("Suppliers CSV uploaded successfully!")
                else:
                    st.sidebar.error("Suppliers CSV is missing required columns. Please check the format.")
                    st.sidebar.info("Required columns: supplier_id, name, performance_score, delivery_time")
                    return None, None, None
            except Exception as e:
                st.sidebar.error(f"Error reading Suppliers CSV: {str(e)}")
                return None, None, None
        else:
            st.sidebar.warning("Please upload Suppliers CSV")
            return None, None, None
        
        # Upload orders CSV
        orders_file = st.sidebar.file_uploader("Upload Orders CSV", type=["csv"])
        if orders_file is not None:
            try:
                orders_df = pd.read_csv(orders_file)
                if validate_orders_df(orders_df):
                    st.sidebar.success("Orders CSV uploaded successfully!")
                else:
                    st.sidebar.error("Orders CSV is missing required columns. Please check the format.")
                    st.sidebar.info("Required columns: order_id, product_id, supplier_id, quantity, order_date")
                    return None, None, None
            except Exception as e:
                st.sidebar.error(f"Error reading Orders CSV: {str(e)}")
                return None, None, None
        else:
            st.sidebar.warning("Please upload Orders CSV")
            return None, None, None
        
        return products_df, suppliers_df, orders_df

# Load data
products_df, suppliers_df, orders_df = load_data()

# If data loading failed, stop execution
if products_df is None:
    st.stop()

# Merge orders with products and suppliers
orders_df = orders_df.merge(products_df, on="product_id", suffixes=('', '_product'))
orders_df = orders_df.merge(suppliers_df, on="supplier_id", suffixes=('', '_supplier'))

# Feature engineering for ML model
def prepare_data(df):
    # Extract date features
    df['order_date'] = pd.to_datetime(df['order_date'])
    df['year'] = df['order_date'].dt.year
    df['month'] = df['order_date'].dt.month
    df['day'] = df['order_date'].dt.day
    df['weekday'] = df['order_date'].dt.dayofweek
    
    # Calculate days since last order for each product
    df = df.sort_values('order_date')
    df['days_since_last_order'] = df.groupby('product_id')['order_date'].diff().dt.days.fillna(0)
    
    # Calculate rolling average quantity for each product
    df['rolling_avg_quantity'] = df.groupby('product_id')['quantity'].transform(
        lambda x: x.rolling(window=3, min_periods=1).mean()
    )
    
    return df

# Prepare data for ML model
ml_data = prepare_data(orders_df.copy())

# Train ML model
def train_model(data):
    # Select features
    features = ['year', 'month', 'day', 'weekday', 'days_since_last_order', 
                'rolling_avg_quantity', 'current_stock', 'min_stock_level', 
                'unit_price', 'performance_score', 'delivery_time']
    
    # Prepare X and y
    X = data[features]
    y = data['quantity']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test_scaled)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    return model, scaler, mae, r2, features

# Train the model
model, scaler, mae, r2, features = train_model(ml_data)

# Function to predict demand
def predict_demand(model, scaler, features, product_data):
    # Prepare input data
    input_data = product_data[features].copy()
    
    # Scale features
    input_scaled = scaler.transform(input_data)
    
    # Make predictions
    predictions = model.predict(input_scaled)
    
    return predictions

# Generate predictions for all products
def generate_predictions():
    # Get the latest data for each product
    latest_data = ml_data.groupby('product_id').last().reset_index()
    
    # Ensure we have all required columns from products_df
    required_cols = ['name', 'category', 'current_stock', 'min_stock_level']
    for col in required_cols:
        if col not in latest_data.columns:
            # Get the column from products_df
            latest_data = latest_data.merge(
                products_df[['product_id', col]], 
                on='product_id', 
                how='left'
            )
    
    # Predict demand
    predictions = predict_demand(model, scaler, features, latest_data)
    
    # Create predictions dataframe
    predictions_df = latest_data[['product_id', 'name', 'category', 'current_stock', 'min_stock_level']].copy()
    predictions_df['predicted_demand'] = predictions
    predictions_df['stock_status'] = np.where(
        predictions_df['current_stock'] < predictions_df['predicted_demand'],
        'Insufficient',
        'Sufficient'
    )
    
    return predictions_df

# Generate predictions
predictions_df = generate_predictions()

# Role selector
st.sidebar.title("Role Selection")
role = st.sidebar.selectbox("Select Role", ["Admin", "Manager", "Staff"])

# Main dashboard
st.title(f"Telecom Inventory ML Dashboard - {role} View")

# Display model performance metrics
st.markdown("## ML Model Performance")
col1, col2 = st.columns(2)
col1.metric("Mean Absolute Error", f"{mae:.2f}")
col2.metric("R² Score", f"{r2:.2f}")

st.markdown("---")

# Role-specific dashboard content
if role == "Admin":
    st.markdown("## Admin Dashboard - System Overview")
    
    # KPIs
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Total Products", len(products_df))
    col2.metric("Total Suppliers", len(suppliers_df))
    col3.metric("Low Stock Items", len(predictions_df[predictions_df['stock_status'] == 'Insufficient']))
    col4.metric("Avg. Supplier Performance", f"{suppliers_df['performance_score'].mean():.1f}%")
    
    # Demand Forecasting Chart
    st.markdown("### Demand Forecasting by Category")
    category_demand = predictions_df.groupby('category')['predicted_demand'].sum().reset_index()
    fig = px.bar(category_demand, x='category', y='predicted_demand', 
                 title="Predicted Demand by Product Category",
                 color='category', color_discrete_sequence=px.colors.qualitative.Plotly)
    st.plotly_chart(fig, use_container_width=True)
    
    # Stock Status Chart
    st.markdown("### Stock Status Overview")
    stock_status_counts = predictions_df['stock_status'].value_counts().reset_index()
    stock_status_counts.columns = ['status', 'count']
    fig = px.pie(stock_status_counts, values='count', names='status', 
                 title="Stock Status Distribution",
                 color_discrete_map={'Sufficient': 'green', 'Insufficient': 'red'})
    st.plotly_chart(fig, use_container_width=True)
    
    # Supplier Performance
    st.markdown("### Supplier Performance Analysis")
    fig = px.scatter(suppliers_df, x='delivery_time', y='performance_score', 
                     hover_name='name', size='performance_score',
                     title="Supplier Performance vs Delivery Time",
                     color='performance_score', color_continuous_scale='RdYlGn')
    st.plotly_chart(fig, use_container_width=True)
    
    # Low Stock Products Table
    st.markdown("### Low Stock Products")
    low_stock = predictions_df[predictions_df['stock_status'] == 'Insufficient'].sort_values('predicted_demand', ascending=False)
    st.dataframe(low_stock[['product_id', 'name', 'category', 'current_stock', 'predicted_demand']])
    
    # Feature Importance
    st.markdown("### Feature Importance")
    feature_importance = pd.DataFrame({
        'feature': features,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    fig = px.bar(feature_importance, x='importance', y='feature', 
                 title="Feature Importance in Demand Prediction",
                 orientation='h')
    st.plotly_chart(fig, use_container_width=True)
    
    # Data Export
    st.markdown("### Data Export")
    col1, col2, col3 = st.columns(3)
    
    # Export products
    products_csv = products_df.to_csv(index=False).encode('utf-8')
    col1.download_button(
        label="Download Products CSV",
        data=products_csv,
        file_name='products_data.csv',
        mime='text/csv'
    )
    
    # Export suppliers
    suppliers_csv = suppliers_df.to_csv(index=False).encode('utf-8')
    col2.download_button(
        label="Download Suppliers CSV",
        data=suppliers_csv,
        file_name='suppliers_data.csv',
        mime='text/csv'
    )
    
    # Export predictions
    predictions_csv = predictions_df.to_csv(index=False).encode('utf-8')
    col3.download_button(
        label="Download Predictions CSV",
        data=predictions_csv,
        file_name='predictions_data.csv',
        mime='text/csv'
    )

elif role == "Manager":
    st.markdown("## Manager Dashboard - Category Overview")
    
    # Category selection
    selected_category = st.selectbox("Select Category", products_df['category'].unique())
    
    # Filter data for selected category
    category_products = products_df[products_df['category'] == selected_category]
    category_predictions = predictions_df[predictions_df['category'] == selected_category]
    category_orders = orders_df[orders_df['category'] == selected_category].copy()
    
    # KPIs
    col1, col2, col3 = st.columns(3)
    col1.metric("Products in Category", len(category_products))
    col2.metric("Low Stock Items", len(category_predictions[category_predictions['stock_status'] == 'Insufficient']))
    col3.metric("Avg. Demand", f"{category_predictions['predicted_demand'].mean():.1f} units")
    
    # Demand Forecasting Chart
    st.markdown(f"### Demand Forecasting for {selected_category}")
    fig = px.bar(category_predictions, x='name', y='predicted_demand', 
                 title=f"Predicted Demand for {selected_category} Products",
                 color='stock_status', color_discrete_map={'Sufficient': 'green', 'Insufficient': 'red'})
    st.plotly_chart(fig, use_container_width=True)
    
    # Stock Status Chart
    st.markdown("### Stock Status Distribution")
    stock_status_counts = category_predictions['stock_status'].value_counts().reset_index()
    stock_status_counts.columns = ['status', 'count']
    fig = px.pie(stock_status_counts, values='count', names='status', 
                 title=f"Stock Status for {selected_category}",
                 color_discrete_map={'Sufficient': 'green', 'Insufficient': 'red'})
    st.plotly_chart(fig, use_container_width=True)
    
    # Order Trend
    st.markdown("### Order Trend")
    category_orders['order_date'] = pd.to_datetime(category_orders['order_date'])
    monthly_orders = category_orders.groupby(category_orders['order_date'].dt.to_period('M')).size().reset_index(name='count')
    monthly_orders['order_date'] = monthly_orders['order_date'].dt.to_timestamp()
    
    fig = px.line(monthly_orders, x='order_date', y='count', 
                 title=f"Monthly Order Trend for {selected_category}")
    st.plotly_chart(fig, use_container_width=True)
    
    # Low Stock Products Table
    st.markdown("### Low Stock Products")
    low_stock = category_predictions[category_predictions['stock_status'] == 'Insufficient'].sort_values('predicted_demand', ascending=False)
    st.dataframe(low_stock[['product_id', 'name', 'current_stock', 'predicted_demand']])
    
    # Supplier Performance for Category
    st.markdown("### Supplier Performance for Category")
    category_suppliers = category_orders.groupby('supplier_id').agg({
        'performance_score': 'mean',
        'delivery_time': 'mean',
        'quantity': 'sum'
    }).reset_index()
    
    category_suppliers = category_suppliers.merge(suppliers_df[['supplier_id', 'name']], on='supplier_id')
    
    fig = px.scatter(category_suppliers, x='delivery_time', y='performance_score', 
                     hover_name='name', size='quantity',
                     title="Supplier Performance for Category",
                     color='performance_score', color_continuous_scale='RdYlGn')
    st.plotly_chart(fig, use_container_width=True)
    
    # Export Report
    st.markdown("### Export Report")
    category_report = category_predictions.copy()
    category_report_csv = category_report.to_csv(index=False).encode('utf-8')
    
    st.download_button(
        label=f"Export {selected_category} Report",
        data=category_report_csv,
        file_name=f'{selected_category}_report.csv',
        mime='text/csv'
    )

elif role == "Staff":
    st.markdown("## Staff Dashboard - Product Management")
    
    # Product selection
    selected_product = st.selectbox("Select Product", products_df['name'])
    product_id = products_df[products_df['name'] == selected_product]['product_id'].values[0]
    
    # Filter data for selected product
    product_data = products_df[products_df['product_id'] == product_id].iloc[0]
    product_predictions = predictions_df[predictions_df['product_id'] == product_id].iloc[0]
    product_orders = orders_df[orders_df['product_id'] == product_id].copy()
    
    # Product details
    st.markdown("### Product Details")
    col1, col2, col3 = st.columns(3)
    col1.metric("Product ID", product_data['product_id'])
    col2.metric("Category", product_data['category'])
    col3.metric("Unit Price", f"${product_data['unit_price']}")
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Current Stock", product_data['current_stock'])
    col2.metric("Min Stock Level", product_data['min_stock_level'])
    col3.metric("Stock Status", product_predictions['stock_status'])
    
    # Demand Forecasting
    st.markdown("### Demand Forecasting")
    col1, col2 = st.columns(2)
    col1.metric("Predicted Demand", f"{product_predictions['predicted_demand']:.1f} units")
    col2.metric("Stock Deficit", f"{max(0, product_predictions['predicted_demand'] - product_data['current_stock']):.1f} units" if product_predictions['stock_status'] == 'Insufficient' else "0 units")
    
    # Order History
    st.markdown("### Order History")
    product_orders['order_date'] = pd.to_datetime(product_orders['order_date'])
    product_orders = product_orders.sort_values('order_date', ascending=False).head(10)
    
    fig = px.bar(product_orders, x='order_date', y='quantity', 
                 title=f"Recent Orders for {selected_product}",
                 color='supplier_id')
    st.plotly_chart(fig, use_container_width=True)
    
    # Supplier Performance for Product
    st.markdown("### Supplier Performance for Product")
    product_suppliers = product_orders.groupby('supplier_id').agg({
        'performance_score': 'mean',
        'delivery_time': 'mean',
        'quantity': 'sum'
    }).reset_index()
    
    product_suppliers = product_suppliers.merge(suppliers_df[['supplier_id', 'name']], on='supplier_id')
    
    fig = px.bar(product_suppliers, x='name', y='quantity', 
                 title=f"Supplier Quantity for {selected_product}",
                 color='performance_score', color_continuous_scale='RdYlGn')
    st.plotly_chart(fig, use_container_width=True)
    
    # Recommended Actions
    st.markdown("### Recommended Actions")
    if product_predictions['stock_status'] == 'Insufficient':
        st.warning(f"⚠️ Stock is insufficient! Predicted demand is {product_predictions['predicted_demand']:.1f} units but current stock is only {product_data['current_stock']} units.")
        st.info("Recommended action: Place a new order for this product.")
    else:
        st.success("✅ Stock levels are sufficient for predicted demand.")
        st.info("No immediate action required.")
    
    # Export Product Data
    st.markdown("### Export Product Data")
    product_data_export = pd.DataFrame([product_data])
    product_data_export['predicted_demand'] = product_predictions['predicted_demand']
    product_data_export['stock_status'] = product_predictions['stock_status']
    
    product_csv = product_data_export.to_csv(index=False).encode('utf-8')
    
    # Streamlit download button for product data
    st.download_button(
        label=f"Export {selected_product} Data",
        data=product_csv,
        file_name=f'{selected_product}_data.csv',
        mime='text/csv'
    )