from flask import Blueprint, jsonify, request, abort
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries.
    """
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary.
    Validation: Ensure the user exists.
    """
    if id < 1:
        return jsonify({"error": "Invalid user ID"}), 400

    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict())
