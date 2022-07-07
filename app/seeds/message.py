from app.models import db, Message


# Adds a demo user, you can add other users here if you want
def seed_messages():
    content1 = Message(
        content='hello',channelId=1, userId="1")
    content2 = Message(
        content='my name is demo', channelId=1, userId="1")


    db.session.add(content1)
    db.session.add(content2)


    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
