from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    general = Channel(
        name='General', serverId=1, userId="1")
    announcements = Channel(
        name='Announcements', serverId=1, userId="1")
    Gaming = Channel(
        name='Gaming', serverId=1, userId="1")
    Art = Channel(
        name='Art', serverId=1, userId="1")


    db.session.add(general)
    db.session.add(announcements)
    db.session.add(Gaming)
    db.session.add(Art)


    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
