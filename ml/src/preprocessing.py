# ml/src/preprocessing.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def load_data(file_path):
    """Load data from Excel file"""
    return pd.read_excel(file_path)

def preprocess_data(df):
    """Preprocess the subscription data"""
    # Drop unnecessary columns
    df = df.drop(columns=['customer_id', 'signup_date'])
    
    # Handle missing values
    df['last_payment_date'].fillna(df['last_payment_date'].mode()[0], inplace=True)
    df['payment_method'].fillna('Unknown', inplace=True)
    
    # Create target variable for churn prediction
    df['churn'] = (df['status'] == 'cancelled').astype(int)
    df = df.drop(columns=['status'])
    
    # Feature engineering
    df['tenure_days'] = (pd.to_datetime('today') - pd.to_datetime(df['last_payment_date'])).dt.days
    df = df.drop(columns=['last_payment_date'])
    
    # Split features and target
    X = df.drop(columns=['churn'])
    y = df['churn']
    
    # Identify categorical and numerical columns
    categorical_cols = X.select_dtypes(include=['object']).columns
    numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns
    
    # Preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
        ])
    
    # Preprocess the data
    X_processed = preprocessor.fit_transform(X)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42
    )
    
    return X_train, X_test, y_train, y_test, preprocessor