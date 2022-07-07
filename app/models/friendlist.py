from app.models import db
friendlist = db.Table(
    "friendlist",
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friendId', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)
