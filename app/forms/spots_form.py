from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SubmitField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange


class AddSpotForm(FlaskForm):
    title = StringField('Title', validators=[
                        DataRequired(), Length(min=2, max=100)])
    description = TextAreaField('Description', validators=[
                                DataRequired(), Length(min=10, max=1000)])
    price_per_night = DecimalField('Price per Night', validators=[
                                   DataRequired(), NumberRange(min=0)])
    location = StringField('Location', validators=[
                           DataRequired(), Length(min=2, max=100)])
    max_guests = IntegerField('Maximum Guests', validators=[
                              DataRequired(), NumberRange(min=1)])
    spot_type = SelectField('Type of Spot', choices=[('house', 'House'), (
        'apartment', 'Apartment'), ('condo', 'Condo'), ('cabin', 'Cabin')], validators=[DataRequired()])
    submit = SubmitField('Add Spot')
