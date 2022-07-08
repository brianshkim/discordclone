from flask_wtf import FlaskForm
from psycopg2 import Date
from wtforms import StringField, DateField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from datetime import date
import datetime
import re

def email_validation(x):
    a=0
    y=len(x)
    dot=x.find(".")
    at=x.find("@")
    for i in range (0,at):
        if((x[i]>='a' and x[i]<='z') or (x[i]>='A' and x[i]<='Z')):
            a=a+1
    if(a>0 and at>0 and (dot-at)>0 and (dot+1)<y):
        return True
    else:
        return False


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already registered')
    if not email_validation(email):
        raise ValidationError("Not a Valid Email")



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
    print("ASDFJAKFJAKLJFKLJF", int(difference.days/365))
    if int(difference.days/365) < 13:
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
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_check])
    birthday = DateField('birthday', validators=[DataRequired(), Email(), age_check])
