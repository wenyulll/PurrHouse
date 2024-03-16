from flask import Blueprint, request, jsonify
from datetime import datetime
from models import Booking, db

booking_bp = Blueprint('booking_bp', __name__)


def parse_date(date_string):
    return datetime.strptime(date_string, '%Y-%m-%d')


def commit_to_db(instance, operation="add"):
    try:
        if operation == "add":
            db.session.add(instance)
        elif operation == "delete":
            db.session.delete(instance)
        db.session.commit()
        return True, ""
    except Exception as e:
        db.session.rollback()
        return False, str(e)


@booking_bp.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    new_booking = Booking(
        property_id=data.get('property_id'),
        user_id=data.get('user_id'),
        start_date=parse_date(data.get('start_date')),
        end_date=parse_date(data.get('end_date'))
    )

    success, message = commit_to_db(new_booking)
    if success:
        return jsonify({"message": "Booking created successfully!", "booking_id": new_booking.id}), 201
    else:
        return jsonify({"error": message}), 400


@booking_bp.route('/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([
        {
            "id": booking.id,
            "property_id": booking.property_id,
            "user_id": booking.user_id,
            "start_date": booking.start_date.strftime('%Y-%m-%d'),
            "end_date": booking.end_date.strftime('%Y-%m-%d')
        } for booking in bookings
    ]), 200


@booking_bp.route('/bookings/<int:booking_id>', methods=['DELETE'])
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    success, message = commit_to_db(booking, "delete")
    if success:
        return jsonify({"message": "Booking cancelled successfully!"}), 200
    else:
        return jsonify({"error": message}), 400
