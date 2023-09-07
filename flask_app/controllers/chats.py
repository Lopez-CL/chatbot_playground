from flask_app import app
from flask import request, render_template, redirect, session, flash
# import os, requests
# Render page with chatbot interface
@app.route('/')
def render_chatbot():
    return render_template('index.html')
