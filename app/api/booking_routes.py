from flask import Blueprint, request, jsonify
from datetime import datetime

from models import Booking, db

booking_bp = Blueprint('booking_bp', __name__)


@booking_bp.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    try:
        new_booking = Booking(
            property_id=data['property_id'],
            user_id=data['user_id'],
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d')
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({"message": "Booking created successfully!", "booking_id": new_booking.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
