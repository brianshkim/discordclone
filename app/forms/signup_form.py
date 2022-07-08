from flask_wtf import FlaskForm
from psycopg2 import Date
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from datetime import date


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def age_check(form, field):
    birthday = field.data
    today = date.today()




class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    birthday = DateField('birthday', validators=[DataRequired()])
