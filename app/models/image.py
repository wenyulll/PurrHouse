from flask_sqlalchemy import SQLAlchemy
from .extensions import db
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA", '')


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spotId = db.Column(db.Integer, db.ForeignKey(
        ('spots.id')), nullable=False)
    url = db.Column(db.String(256), nullable=False)
    caption = db.Column(db.String(256))


def add_prefix_for_prod(attr):

    if environment == "production" and SCHEMA:
        return f"{SCHEMA}.{attr}"
    return attr
