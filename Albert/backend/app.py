from flask import Flask, request, jsonify
from flask_cors import CORS
from llm_handler import albert_in_claude
# from config import Config
# from llm_handler import LLMHandler

app = Flask(__name__)
# app.config.from_object(Config)
CORS(app)

# llm_handler = LLMHandler()

@app.route('/generate', methods=['POST'])
def generate_response():
    if request.content_type == 'application/json':
        data = request.json
        text = data.get("text")
        editorLLM = data.get("editorLLM")
        tone = data.get("tone")
        jurisdiction = data.get("jurisdiction")
    else:
        data = request.form
        text = data.get("draft")
        editorLLM = data.get("editorLLM")
        tone = data.get("tone")
        jurisdiction = data.get("jurisdiction")

    if not text or not editorLLM or not tone or not jurisdiction:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # response = albert_in_claude(text)
        return jsonify({
            "response": "Test Response",
            "text": "Test Response",
            "editorLLM": editorLLM,
            "tone": tone,
            "jurisdiction": jurisdiction,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])