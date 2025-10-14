from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load the trained model and vectorizer
model = joblib.load("model.joblib")
vectorizer = joblib.load("vectorizer.joblib")

app = FastAPI()

class ReportRequest(BaseModel):
    text: str
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify")
def classify(report: ReportRequest):
    # Transform text using the trained vectorizer
    X = vectorizer.transform([report.text])
    predicted_crime = model.predict(X)[0]

    # Create structured complaint text
    complaint = (
        f"Dear Cyber Cell,\n"
        f"I would like to report a case of {predicted_crime}.\n"
        f"Incident details: {report.text}\n"
        f"Kindly take necessary action.\n"
        f"Thank you."
    )

    return {
        "crime_type": predicted_crime,
        "complaint": complaint
    }
