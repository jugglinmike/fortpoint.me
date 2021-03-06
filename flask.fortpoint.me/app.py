from flask import Flask, Response, request, render_template
from flask import redirect, url_for
from subprocess import call
from os.path import abspath, dirname, join

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
    github_ips = ['207.97.227.253', '50.57.128.197', '108.171.174.178']
    if request.remote_addr in github_ips:
        script = join('..', HERE, 'pull-latest.sh')
        call(script, shell=True)

if __name__ == '__main__':
    app.run()
