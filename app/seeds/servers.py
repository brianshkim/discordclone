from app.models import db, Server, User


# Adds a demo user, you can add other users here if you want
def seed_servers():
    users = User.query.all()
    custom_users=[user for user in users if user.id in [1,2,3]]
    custom = Server(
        name = "first",
        adminId=1,
        users = custom_users
    )
    db.session.add(custom)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
