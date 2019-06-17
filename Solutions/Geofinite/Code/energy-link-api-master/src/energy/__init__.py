import logging
import os
import psycopg2

from flask import Flask, jsonify
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec
from flask_cors import CORS, cross_origin
from psycopg2.extensions import connection as Connection

from energy.api.data import data
from energy.utils.config import Config
from energy.data.wrapper import DataWrapper

logger = logging.getLogger(__name__)


def _load_postgres_backend(config: Config) -> Connection:
    sql_config = config["sql"]
    host = sql_config["host"]
    port = sql_config["port"]
    database = sql_config["database"]
    user = sql_config["user"]
    password = sql_config.get("password", None)

    conn = psycopg2.connect(host=host, port=port, dbname=database, user=user, password=password)

    # Try the connection
    with conn.cursor() as cur:
        cur.execute("select 1")

    return conn

def load_data_wrapper(app: Flask, config: Config) -> DataWrapper:
    app_config = config["energy"]

    # High level database connection
    conn = _load_postgres_backend(config)
    schema_name = "energylink"
    data_wrapper = DataWrapper(conn=conn, schema_name=schema_name)

    with app.app_context():
        app.data_wrapper = data_wrapper

    return data_wrapper


def create_app(config: Config) -> Flask:
    app = Flask(__name__)
    cors = CORS(app, resources={r"/energy/*": {"origins": "*"}})

    with app.app_context():
        app.configuration = config

    app.register_blueprint(data)
    load_data_wrapper(app, config)

    return app

