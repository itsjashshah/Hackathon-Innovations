# Albert: Plain Language Converter for Legal Documents

## About
Albert is a web-based application that transforms complex legal documents into plain language using a fine-tuned LLM model. Developed during the LLM x Law Hackathon #4 at Stanford University, this tool aims to save lawyers time and empower clients by making legal documents more accessible.

**Event:** LLM x Law Hackathon @Stanford #4
**Date:** September 8, 2024
**Location:** Stanford Campus, Palo Alto, California

## Features
- Upload PDF documents or input text directly
- Choose from different LLM models for processing
- Select tone and jurisdiction for the output
- Download processed documents as PDF

## Tech Stack
- Frontend: React
- Backend: Flask
- NLP: Anthropic API (Claude model)
- PDF Generation: jsPDF

## Setup and Running

### Backend
1. Navigate to the backend folder

2. Install dependencies:
pip install flask flask_cors anthropic

3. Run the Flask server:
python3 app.py

The server will start on `http://127.0.0.1:5000`

### Frontend
1. Navigate to the frontend folder

2. Install dependencies:
npm install

3. Start the React development server:
npm start

The application will be available at `http://localhost:3000`

## How It Works
1. Users can upload a PDF or input text directly into the web interface.
2. They can select the LLM model, tone, and jurisdiction for processing.
3. The frontend sends this data to the Flask backend.
4. The backend uses the Anthropic API (Claude model) to process the text according to the specified parameters.
5. The processed text is sent back to the frontend and displayed to the user.
6. Users can then download the processed document as a PDF.

## Author
Jash Shah

