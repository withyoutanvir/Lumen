# ml/src/churn_prediction.py
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

def train_churn_model(X_train, y_train):
    """Train churn prediction model"""
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

def predict_churn(model, X_test):
    """Make churn predictions"""
    return model.predict(X_test)

def evaluate_model(model, X_test, y_test):
    """Evaluate model performance"""
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    return accuracy, report

def save_model(model, filepath):
    """Save trained model"""
    joblib.dump(model, filepath)