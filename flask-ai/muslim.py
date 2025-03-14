from flask import Flask, request, jsonify, render_template_string
import google.generativeai as genai
import os
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from flask_cors import CORS

# ✅ Set up Gemini API Key
from dotenv import load_dotenv
load_dotenv()

# ✅ Read values from .env
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# ✅ Flask App
app = Flask(__name__, static_folder="static")
CORS(app, resources={r"/*": {"origins": "*"}})

# ✅ Paths
DATA_PATH = "faiss_index_muslim"
TEXT_PATH = "Quran.txt"

# ✅ Load FAISS Index (or create if missing)
if os.path.exists(DATA_PATH):
    vectorstore = FAISS.load_local(DATA_PATH, HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"), allow_dangerous_deserialization=True)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
else:
    with open(TEXT_PATH, "r", encoding="utf-8") as file:
        raw_text = file.read()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_text(raw_text)

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_texts(texts, embeddings)
    vectorstore.save_local(DATA_PATH)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# ✅ Retrieval Function
def retrieve_context(question):
    docs = retriever.invoke(question)
    return "\n\n".join([doc.page_content for doc in docs])

# ✅ Generate response using Gemini
def get_gemini_response(question, context):
    model = genai.GenerativeModel("gemini-1.5-pro")
    prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer in 7-8 lines as an Islamic scholar.And give it in easy sentences and follow grammatical rules"
    response = model.generate_content(prompt)
    return response.text.strip()

# ✅ Home Page
@app.route('/')
def home():
    return '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Digital Muslim AI</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Arial', sans-serif;
                background: black;
                color: white;
                text-align: center;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .background-video {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: -1;
            }
            .container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }
            .glass-box {
                background: rgba(0, 0, 0, 0.6);
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                width: 450px;
                text-align: center;
            }
            h1 { font-size: 2rem; margin-bottom: 15px; }
            input[type="text"] {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 5px;
                outline: none;
                margin-bottom: 10px;
            }
            input[type="submit"] {
                padding: 12px 20px;
                background: #ff6600;
                border: none;
                color: white;
                font-weight: bold;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
            }
            input[type="submit"]:hover {
                background: #cc5200;
                box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
            }
        </style>
    </head>
    <body>
        <video autoplay loop class="background-video" id="bgVideo">
            <source src="static/videos/m_answer.mp4" type="video/mp4">
        </video>
        <div class="container">
            <div class="glass-box">
                <h1>Ask Muslim AI</h1>
                <form action="/get_response_muslim" method="POST">
                    <input type="text" name="question" placeholder="Ask your question..." required>
                    <input type="submit" value="Get Wisdom">
                </form>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/get_response_muslim', methods=['POST'])
def get_response_muslim():
    data = request.get_json()
    question = data.get("question") if data else request.form.get("question")

    if not question:
        return jsonify({"error": "No question provided."}), 400

    context = retrieve_context(question)
    response = get_gemini_response(question, context)

    if data:
        return jsonify({"response": response})

    return render_template_string(f'''
    <html>
    <head>
        <title>Your Islamic Wisdom</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background: black;
                color: white;
                text-align: center;
                padding: 50px;
                overflow: hidden;
            }}
            .response-container {{
                position: absolute;
                top: 10%;
                left: 50%;
                transform: translate(-50%, 0);
                width: 80%;
                background: rgba(0, 0, 0, 0.6);
                padding: 20px;
                border-radius: 15px;
                z-index: 2;
                text-align: center;
                color: white;
                font-size: 1.5rem;
                overflow: hidden;
            }}
            .word {{
                display: inline-block;
                opacity: 0;
                transform: translateX(-20px);
                animation: fadeIn 0.5s forwards;
            }}
            @keyframes fadeIn {{
                from {{
                    opacity: 0;
                    transform: translateX(-20px);
                }}
                to {{
                    opacity: 1;
                    transform: translateX(0);
                }}
            }}
            .video-container {{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
            }}
            a {{
                display: block;
                margin-top: 20px;
                color: #ff6600;
                font-size: 1.2rem;
                text-decoration: none;
            }}
        </style>
        <script>
            function showResponseText() {{
                const responseText = { response | tojson };
                const words = responseText.split(" ");
                const responseContainer = document.getElementById("responseText");

                words.forEach((word, index) => {{
                    let span = document.createElement("span");
                    span.className = "word";
                    span.style.animationDelay = `${{index * 300}}ms`;
                    span.textContent = word + " ";
                    responseContainer.appendChild(span);
                }});    
            }}
        </script>
    </head>
    <body onload="showResponseText()">
        <div class="response-container">
            <h1>Your Islamic Wisdom</h1>
            <p id="responseText"></p>
            <a href="/">Try Again</a>
        </div>
        <div class="video-container">
            <video autoplay loop muted playsinline class="background-video" id="bgVideo">
                <source src="{{ url_for('static', filename='images/allah.jpg') }}" type="video/mp4">
            </video>
        </div>
    </body>
    </html>
    ''')

if __name__ == '__main__':
    app.run(port=5002, debug=True)
