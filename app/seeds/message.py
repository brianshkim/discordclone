from app.models import db, Message
import time,datetime


def now_milliseconds():
   return int(time.time() * 1000)

def date_time_milliseconds(date_time_obj):
   return int(time.mktime(date_time_obj.timetuple()) * 1000)

mstimetwo = date_time_milliseconds(datetime.datetime.utcnow())

# Adds a demo user, you can add other users here if you want
def seed_messages():
    content1 = Message(
        content='hello',channelId=1, userId="1", username="demo", createdate=mstimetwo)
    content2 = Message(
        content='my name is demo', channelId=1, userId="1", username="demo", createdate=mstimetwo)


    db.session.add(content1)
    db.session.add(content2)


    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
