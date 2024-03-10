from flask import Flask, render_template
import subprocess
import sys

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
    url = "http://localhost:8000"
    subprocess.Popen([sys.executable, "-m", "webbrowser", url])