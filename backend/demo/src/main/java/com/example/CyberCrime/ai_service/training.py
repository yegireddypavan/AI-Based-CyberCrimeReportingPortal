import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

# Sample dataset
data = {
    "text": [
        "I received a call asking for my OTP and banking details",
        "Someone sent me threatening messages on social media",
        "My debit card details were stolen and used online",
        "A fake job offer email asked me to pay registration fees",
        "I was blackmailed using private photos shared online",
        "Money was deducted from my account without consent",
        "Received SMS link to update KYC which was fake",
    ],
    "label": [
        "Phishing",
        "Online Harassment",
        "Financial Fraud",
        "Phishing",
        "Online Harassment",
        "Financial Fraud",
        "Phishing"
    ]
}

df = pd.DataFrame(data)

# Split and vectorize
X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.2, random_state=42)
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)

# Train model
model = LogisticRegression()
model.fit(X_train_vec, y_train)

# Save model and vectorizer
joblib.dump(model, "model.joblib")
joblib.dump(vectorizer, "vectorizer.joblib")

print("✅ Model trained and saved!")
