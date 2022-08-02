from .db import db
import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey("channels.id", ondelete="CASCADE"))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    username= db.Column(db.String())
    createdate = db.Column(db.BigInteger)


    def to_dict(self):
     return {
        "id": self.id,
        "content": self.content,
        "channelId": self.channelId,
        'userId': self.userId,
        'username':self.username,
        "createdate":self.createdate
        }

    channels = db.relationship("Channel", back_populates="messages", cascade="all,delete")
    users = db.relationship("User", back_populates="messages")
