from app.models import db
serverlists = db.Table(

    "serverlists",
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False),
    db.Column('serverId', db.Integer, db.ForeignKey('servers.id'), primary_key=True, nullable=False)
)
