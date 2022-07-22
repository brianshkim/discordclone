from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    general = Channel(
        name='General', serverId=1, userId="1", voice=False)
    announcements = Channel(
        name='Announcements', serverId=1, userId="1", voice=False)
    Gaming = Channel(
        name='Gaming', serverId=1, userId="1", voice=False)
    Art = Channel(
        name='Art', serverId=1, userId="1", voice=False)
    GeneralVoice = Channel(
        name='GeneralVoice', serverId=1, userId="1", voice=True)
    general2 = Channel(
        name='General', serverId=2, userId="2", voice=False)
    announcements2 = Channel(
        name='Announcements', serverId=2, userId="2", voice=False)
    Gaming2 = Channel(
        name='Gaming', serverId=2, userId="2", voice=False)
    Art2 = Channel(
        name='Art', serverId=2, userId="2", voice=False)


    db.session.add(general)
    db.session.add(announcements)
    db.session.add(Gaming)
    db.session.add(Art)
    db.session.add(GeneralVoice)
    db.session.add(general2)
    db.session.add(announcements2)
    db.session.add(Gaming2)
    db.session.add(Art2)


    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
