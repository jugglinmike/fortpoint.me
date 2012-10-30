from flask import Flask, Response, request, render_template
from flask import redirect, url_for, request
from subprocess import Popen
from os.path import abspath, dirname, join
import json
import settings
import re

HERE = dirname(abspath(__file__))

app = Flask(__name__, static_path='/static')
app.debug = True


@app.route('/')
def home_canonical():
    return render_template('home.html', active='home')


@app.route('/home/')
def home():
    return redirect(url_for('home_canonical'))


@app.route('/story/')
def story():
    return render_template('story.html', active='story')


@app.route('/companies/')
def companies():
    return render_template('companies.html', active='companies')


@app.route('/team/')
def team():
    return render_template('team.html', active='team')


@app.route('/connect/')
def connect():
    return render_template('connect.html', active='team')

@app.route('/github-webhook', methods=['POST'])
def pull_latest():

    if request.args['secret'] != settings.github_secret:
      return ""

    payload = json.loads(request.form['payload'])

    match = re.search("^refs/heads/(preview-[a-zA-Z0-9_/-]+|master)$",
            payload['ref'])
    if not match:
      return ""

    branchname = match.group(1)

    script = join(HERE, '..', 'pull-latest.sh')

    try:
        Popen([script, branchname], shell=True)
    except:
        pass

    return ""

if __name__ == '__main__':
    app.run()
