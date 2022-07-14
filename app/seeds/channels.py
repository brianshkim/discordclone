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
    general2 = Channel(
        name='General', serverId=2, userId="2")
    announcements2 = Channel(
        name='Announcements', serverId=2, userId="2")
    Gaming2 = Channel(
        name='Gaming', serverId=2, userId="2")
    Art2 = Channel(
        name='Art', serverId=2, userId="2")


    db.session.add(general)
    db.session.add(announcements)
    db.session.add(Gaming)
    db.session.add(Art)
    db.session.add(general2)
    db.session.add(announcements2)
    db.session.add(Gaming2)
    db.session.add(Art2)


    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
