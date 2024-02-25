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

    beach_house = Spot(
        title='Sunny Beach House',
        description='A bright and airy beach house on the coast. Perfect for sunbathing and relaxation.',
        location='Seaside',
        price_per_night=180
    )
    urban_loft = Spot(
        title='Chic Urban Loft',
        description='A stylish loft in the urban area, with modern amenities and close to nightlife.',
        location='City Center',
        price_per_night=210
    )
    country_farmhouse = Spot(
        title='Country Farmhouse',
        description='A peaceful farmhouse in the countryside, surrounded by nature and farm animals.',
        location='Countryside',
        price_per_night=130
    )

    db.session.add(cozy_cottage)
    db.session.add(city_apartment)
    db.session.add(mountain_cabin)

    db.session.commit()

    db.session.add_all([cozy_cottage, city_apartment, mountain_cabin,
                       beach_house, urban_loft, country_farmhouse])

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
