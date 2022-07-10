from app.models import db
serverlists = db.Table(

    "serverlists",
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), primary_key=True, nullable=False),
    db.Column('serverId', db.Integer, db.ForeignKey('servers.id', ondelete="CASCADE"), primary_key=True, nullable=False)
)
