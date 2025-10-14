# # File: app.py
# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import os
# import google.generativeai as genai
# from dotenv import load_dotenv
#
# # Load API key from .env
# load_dotenv()
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
#
# app = FastAPI()
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# class ReportRequest(BaseModel):
#     text: str
#
# @app.post("/classify")
# def classify(report: ReportRequest):
#     """
#     Generate crime type and complaint using Gemini API
#     """
#
#     # Prompt: VERY clear instructions to NOT output JSON or markdown
#     prompt = f"""
#     You are an AI assistant that drafts cybercrime complaints.
#     Read the user text below, then output TWO things in plain text ONLY (no code blocks, no JSON, no markdown):
#
#     1. The type of crime (short, 3-5 words)
#     2. A professional complaint email/letter
#
#     Respond only with the following format:
#
#     Crime Type: <crime type>
#     Complaint: <full complaint text>
#
#     User text: {report.text}
#     """
#
#     response = genai.chat(
#         model="models/embedded-gecko-1",
#         messages=[{"author": "user", "content": [{"type": "text", "text": prompt}]}]
#     )
#
#     raw_text = response.last["content"][0]["text"]
#
#     # Extract crime type and complaint from raw_text
#     crime_type = "Unknown"
#     complaint = raw_text
#
#     # If "Crime Type:" is in output, split it
#     if "Crime Type:" in raw_text and "Complaint:" in raw_text:
#         parts = raw_text.split("Complaint:")
#         crime_type = parts[0].replace("Crime Type:", "").strip()
#         complaint = parts[1].strip()
#
#     return {
#         "crime_type": crime_type,
#         "complaint": complaint
#     }
