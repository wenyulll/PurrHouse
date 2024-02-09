from flask_sqlalchemy import SQLAlchemy
from .extensions import db
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA", '')


class Spot(db.Model):
    __tablename__ = 'spots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        _owner_id_fk), nullable=False)
    address = db.Column(db.String(128), nullable=False)
    city = db.Column(db.String(64), nullable=False)
    state = db.Column(db.String(64), nullable=False)
    country = db.Column(db.String(64), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)


def add_prefix_for_prod(attr):
    """Helper function to add schema prefix for foreign key references in production."""
    if environment == "production" and SCHEMA:
        return f"{SCHEMA}.{attr}"
    return attr
