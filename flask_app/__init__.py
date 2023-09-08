from flask import Flask
from flask_session import Session
app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'  # Use the filesystem as the session storage
app.config['SESSION_FILE_DIR'] = 'your_session_directory'  # Specify a directory to save session files
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True  # Secure your cookies
app.secret_key = 'keepitsecretkeepitsafe'
Session(app)