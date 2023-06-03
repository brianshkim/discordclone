from app.models import db

def seed_serverlists():
    pass


def undo_serverlists():
    db.session.execute('TRUNCATE serverlists RESTART IDENTITY CASCADE')
    db.session.commit()
