import os
import datetime
import flask
import pymongo
import markdown
import bson
import requests

app = flask.Flask(__name__)


def get_db():

    db = getattr(flask.g, "_database", None)

    if db is None:

        db = flask.g._database = pymongo.MongoClient(
            get_config()["MONGO_URL"]
        ).dennylungu

    return db


def get_config():

    config = getattr(flask.g, "_config", None)

    if config is None:
        from dotenv import dotenv_values

        config = dotenv_values(".env")

    return config


# https://auth0.com/blog/best-practices-for-flask-api-development/
@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects = get_db().projects.find({}, {"_id": 0})

    if projects is None:
        flask.abort(404)

    projects = list(projects)
    return flask.jsonify(projects)


@app.route("/api/project/<int:project_id>", methods=["GET"])
def get_project(project_id):
    content = flask.request.get_json(silent=True, force=True)

    project = get_db().projects.find_one(
        {"id": project_id},
        {"_id": 0},
    )

    if project is None:
        flask.abort(404)

    project["description"] = markdown.markdown(
        project["description"], extensions=["fenced_code"]
    )

    return flask.jsonify(project)


@app.route("/")
def index():
    return flask.render_template("index.html")


@app.route("/projects")
def projects():
    return flask.render_template("projects.html")


@app.route("/project/<int:project_id>")
def project_page(project_id):
    return flask.render_template("project.html", PROJECT_ID=project_id)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
