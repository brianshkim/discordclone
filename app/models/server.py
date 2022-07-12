from .db import db
from .serverList import serverlists

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    adminId = db.Column(db.Integer, db.ForeignKey("users.id"))



    channels = db.relationship("Channel", back_populates="servers", cascade="all,delete")
    admin = db.relationship("User", back_populates="servers")
    users = db.relationship('User', secondary=serverlists, back_populates='servers', cascade='all, delete')

    def to_dict(self):
     return {
        "id": self.id,
        "name": self.name,
        "adminId": self.adminId,
        "channels": [channel.to_dict() for channel in self.channels],
        "users":[user.to_dict() for user in self.users]

        }

    def get_users(self):
        return [user.to_dict() for user in self.users]
