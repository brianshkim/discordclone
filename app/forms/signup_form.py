from flask_wtf import FlaskForm
from psycopg2 import Date
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from datetime import date
import datetime
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already registered')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def age_check(form, field):
    birthday = field.data
    print("Asdfo3oup43u5oi34u5iou5poi", birthday)
    today = date.today()
    difference = today-birthday
    if difference.days/365 < 13:
        raise ValidationError("You must be at least 13 years old to use Ioniq")



def password_check(form, field):
    password = field.data
    print(len(password))
    if len(password) < 8:
        raise ValidationError("Must be 8 characters long")
    elif not re.search("[~!@#$%^&*]", password):
        raise ValidationError("Password is too weak or common to use")






class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_check])
    birthday = DateField('birthday', validators=[DataRequired(), age_check])
