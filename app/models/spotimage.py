from flask_sqlalchemy import SQLAlchemy
from .extensions import db
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA", '')


def add_prefix_for_prod(attr):
    """Helper function to add schema prefix for foreign key references in production."""
    if environment == "production" and SCHEMA:
        return f"{SCHEMA}.{attr}"
    return attr


class SpotImage(db.Model):
    __tablename__ = 'spot_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('spots.id')), nullable=False)
    image_url = db.Column(db.String(256), nullable=False)
    caption = db.Column(db.String(256), nullable=True)

    spot = db.relationship('Spot', back_populates='images')


class Spot(db.Model):
    __tablename__ = 'spots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    images = db.relationship(
        'SpotImage', back_populates='spot', cascade="all, delete-orphan")
