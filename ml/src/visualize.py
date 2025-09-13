# ml/src/visualize.py
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

def plot_churn_distribution(df):
    """Plot churn distribution"""
    plt.figure(figsize=(8, 6))
    sns.countplot(x='churn', data=df)
    plt.title('Churn Distribution')
    plt.savefig('../notebooks/churn_distribution.png')
    plt.close()

def plot_feature_importance(model, feature_names):
    """Plot feature importance"""
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(12, 8))
    plt.title('Feature Importances')
    plt.bar(range(len(importances)), importances[indices], align='center')
    plt.xticks(range(len(importances)), [feature_names[i] for i in indices], rotation=90)
    plt.tight_layout()
    plt.savefig('../notebooks/feature_importance.png')
    plt.close()

def plot_usage_vs_churn(df):
    """Plot usage vs churn"""
    plt.figure(figsize=(10, 6))
    sns.boxplot(x='churn', y='usage_hours', data=df)
    plt.title('Usage Hours vs Churn')
    plt.savefig('../notebooks/usage_vs_churn.png')
    plt.close()