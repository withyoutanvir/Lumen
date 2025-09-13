# ml/src/recommend.py
import pandas as pd
import joblib
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

def train_recommendation_model(df):
    """Train plan recommendation model"""
    # Select relevant features
    features = ['monthly_fee', 'usage_hours', 'support_calls']
    df_features = df[features].copy()
    
    # Handle missing values
    df_features = df_features.fillna(df_features.mean())
    
    # Scale features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df_features)
    
    # Train KNN model
    model = NearestNeighbors(n_neighbors=3, algorithm='auto')
    model.fit(scaled_features)
    
    return model, scaler

def recommend_plan(model, scaler, customer_data):
    """Recommend plan for a customer"""
    # Scale customer data
    scaled_data = scaler.transform(customer_data)
    
    # Find nearest neighbors
    distances, indices = model.kneighbors(scaled_data)
    
    # Return recommended plans (simplified)
    return indices[0]

def save_recommendation_model(model, filepath):
    """Save recommendation model"""
    joblib.dump(model, filepath)