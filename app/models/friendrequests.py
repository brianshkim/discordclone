from .db import db


class FriendRequests(db.Model):
    __tablename__ = 'friendrequests'

    id = db.Column(db.Integer, primary_key=True)
    requester = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    

    





