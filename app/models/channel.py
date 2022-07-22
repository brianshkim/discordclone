from .db import db


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    serverId = db.Column(db.Integer, db.ForeignKey("servers.id", ondelete="CASCADE"))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    voice=db.Column(db.Boolean, nullable=False, default=False)

    servers = db.relationship("Server", back_populates="channels", cascade="all,delete")
    users = db.relationship("User", back_populates='channels')
    messages = db.relationship("Message", back_populates="channels", cascade="all,delete")


    def to_dict(self):
     return {
        "id": self.id,
        "name": self.name,
        "serverId": self.serverId,
        "userId": self.userId,
        "voice": self.voice
        }

    def get_messages(self):
        return [message.to_dict() for message in self.messages]
