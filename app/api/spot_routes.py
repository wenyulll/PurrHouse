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


@spot_routes.route('/', methods=['POST'])
@login_required
def create_spot():
    """
    Creates a new spot.
    """
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        spot = Spot(
            owner_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            price_per_night=form.data['price_per_night'],
        )
        db.session.add(spot)
        db.session.commit()
        return spot.to_dict()
    return form.errors, 400


@spot_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_spot(id):
    """
    Updates an existing spot.
    """
    spot = Spot.query.get(id)
    if spot and spot.owner_id == current_user.id:
        form = SpotForm()
        if form.validate_on_submit():
            spot.title = form.data['title']
            spot.description = form.data['description']
            spot.price_per_night = form.data['price_per_night']
            db.session.commit()
            return spot.to_dict()
        return form.errors, 400
    return {'errors': {'message': 'Spot not found or unauthorized'}}, 404


@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    """Deletes a spot."""
    spot = Spot.query.get(id)
    if spot and spot.owner_id == current_user.id:
        db.session.delete(spot)
        db.session.commit()
        return {'message': 'Spot deleted successfully'}, 200
    return {'error': 'Spot not found or unauthorized'}, 404
