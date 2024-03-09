from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Spot
# from app.forms import SpotForm

spot_routes = Blueprint('spots', __name__)


@spot_routes.route('/')
@login_required
def get_spots():
    """
    Fetches a list of spots.
    """
    spots = Spot.query.all()
    return jsonify([spot.to_dict() for spot in spots])


@spot_routes.route('/<int:id>')
@login_required
def get_spot(id):
    """
    Fetches a single spot by its ID.
    """
    spot = Spot.query.get(id)
    if spot:
        return spot.to_dict()
    return {'errors': {'message': 'Spot not found'}}, 404
