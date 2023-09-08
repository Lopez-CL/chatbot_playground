from flask_app import app
from flask import request, render_template, redirect, session, flash, jsonify
from flask_session import Session # import os, requests
# My prompt completion method
def get_completion():
    print('yo')
# Render page with chatbot interface
@app.route('/')
def render_chatbot():
    session['messages'] = [
    {"role": "system", "content": "You are a helpful assistant."},
    ]
    print(session['messages'])
    return render_template('index.html')

@app.route('/get/completion', methods = ['post'])
def join_completion_with_messages():
    user_message = request.form['user-prompt']
    if 'messages' in session:
        session['messages'].append({'role': 'user','content':user_message})
        print(session['messages'])
        result = jsonify(session['messages'])
        return result
    # results = get_completion()