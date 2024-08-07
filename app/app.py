import os
import flask
import pymongo
import markdown

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


@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects_query = get_db().projects.find({"hide": {"$ne": True}}, {"_id": 0})

    if projects_query is None:
        flask.abort(404)

    projects_list = list(projects_query)
    return flask.jsonify(projects_list)


@app.route('/favicon.ico')
def favicon():
    return flask.send_from_directory(os.path.join(app.root_path, 'static'),
                                     'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route("/")
def index():
    breadcrumb = (
        ("/", "Home"),
    )
    return flask.render_template("index.html", BREADCRUMB=breadcrumb)


@app.route("/projects")
def projects():
    breadcrumb = (
        ("/", "Home"),
        ("/projects", "Projects"),
    )
    return flask.render_template("projects.html", BREADCRUMB=breadcrumb)


@app.route("/project/<int:project_id>")
def project_page(project_id):
    project = get_db().projects.find_one(
        {"id": project_id},
        {"_id": 0},
    )

    if project is None:
        flask.abort(404)

    project_name = project["name"]
    project_md = markdown.markdown(
        project["description"], extensions=["fenced_code"]
    )
    project_github = project["url"]
    project_github2 = project["url2"]
    project_livedemo = project["demo"]

    project_tags = project["tags"]

    breadcrumb = (
        ("/", "Home"),
        ("/projects", "Projects"),
        ("/project/<int:project_id>", project_name),
    )

    return flask.render_template("project.html", BREADCRUMB=breadcrumb, PROJECT_NAME=project_name,
                                 PROJECT_MD=project_md,
                                 PROJECT_GITHUB_URL=project_github, PROJECT_LIVEDEMO=project_livedemo,
                                 PROJECT_GITHUB_URL2=project_github2, PROJECT_TAGS=project_tags,)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
