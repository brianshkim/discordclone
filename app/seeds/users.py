from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = User.query.all()
    custom_users=[user for user in users if user.id in [2,3]]
    custom_users1=[user for user in users if user.id in [1,3]]
    custom_users2=[user for user in users if user.id in [1,2]]
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        birthday = '2003-01-01',
        friends = custom_users)
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        birthday = '1991-06-30',
        friends = custom_users1)
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        birthday = '1985-08-25',
        friends=custom_users2)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
