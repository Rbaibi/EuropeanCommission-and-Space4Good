import json
import logging

import flask
from flask import Blueprint, current_app, jsonify
from flask_apispec import use_kwargs, marshal_with
from flask_cors import cross_origin
from marshmallow import Schema, fields, post_load, validate

from energy.data.wrapper import DataWrapper

class RequestSchema(Schema):
    longitude = fields.Float(required=True)
    latitude = fields.Float(required=True)
    category = fields.String(required=False)

logger = logging.getLogger(__name__)
data = Blueprint("data", __name__, url_prefix="/data")


@data.route("/sells", methods=["GET"])
@use_kwargs(RequestSchema(strict=True))
@cross_origin()
def get_sells(**params):
    data_wrapper: DataWrapper = current_app.data_wrapper

    longitude = params.get("longitude")
    latitude = params.get("latitude")

    resp = data_wrapper.transactions(True)

    data = {
        "sells": resp
    }

    return jsonify(data)


@data.route("/buys", methods=["GET"])
@use_kwargs(RequestSchema(strict=True))
@cross_origin()
def get_buys(**params):
    data_wrapper: DataWrapper = current_app.data_wrapper

    longitude = params.get("longitude")
    latitude = params.get("latitude")

    resp = data_wrapper.transactions(False)

    data = {
        "buys": resp
    }

    return jsonify(data)


@data.route("/query", methods=["GET"])
@use_kwargs(RequestSchema(strict=True))
@cross_origin()
def get_data(**params):
    data_wrapper: DataWrapper = current_app.data_wrapper

    longitude = params.get("longitude")
    latitude = params.get("latitude")

    resp = data_wrapper.solar(longitude, latitude)
    resp["consumption"] = data_wrapper.consumption()
    return jsonify(resp)
