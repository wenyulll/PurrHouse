from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text


def seed_spots():

    cozy_cottage = Spot(
        title='Cozy Cottage by the Lake',
        description='A lovely, secluded cottage perfect for weekend getaways. Enjoy the serene lake view.',
        location='Lakeview',
        price_per_night=120
    )
    city_apartment = Spot(
        title='Modern Apartment in the Heart of the City',
        description='Experience the city life in this modern, centrally-located apartment.',
        location='Downtown',
        price_per_night=200
    )
    mountain_cabin = Spot(
        title='Rustic Cabin in the Mountains',
        description='Escape to the mountains in this rustic cabin. Ideal for hiking enthusiasts.',
        location='Mountainside',
        price_per_night=150
    )

    db.session.add(cozy_cottage)
    db.session.add(city_apartment)
    db.session.add(mountain_cabin)

    db.session.commit()


def undo_spots():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))
    db.session.commit()


if __name__ == "__main__":
    seed_spots()
