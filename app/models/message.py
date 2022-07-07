from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), nullable=False, unique=True)
    channelId = db.Column(db.Integer, db.ForeignKey("channels.id"))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    createdate = db.Column(db.DateTime)

    def to_dict(self):
     return {
        "id": self.id,
        "content": self.content,
        "channelId": self.channelId,
        'userId': self.userId
        }

    channels = db.relationship("Channel", back_populates="messages")
    users = db.relationship("User", back_populates="messages")
