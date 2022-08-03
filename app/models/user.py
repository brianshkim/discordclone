from .db import db
from .server import Server
from .serverList import serverlists
from .friendlist import friendlist
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    avatar = db.Column(db.String())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    createdServers = db.relationship('Server', back_populates="users")
    servers = db.relationship('Server', secondary=serverlists, back_populates='users', cascade='all, delete')
    channels = db.relationship('Channel', back_populates='users', cascade='all, delete')
    messages = db.relationship("Message", back_populates="users", cascade='all,delete')
    friends = db.relationship('User',
        secondary = friendlist,
        primaryjoin = (friendlist.c.userId == id),
        secondaryjoin = (friendlist.c.friendId == id),
        backref = db.backref('friendlist', lazy = 'dynamic'),
        lazy = 'dynamic')



    def is_friend(self, user):
        return self.friends.filter(friendlist.c.friendId == user.Id).count > 0

    def add_friend(self, user):
        if not self.is_friend(user) :
            self.friend.append(user)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_servers(self):
        return [server.to_dict() for server in self.servers]

    def get_friends(self):
        return [friend.to_dict() for friend in self.friends]

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar':self.avatar

        }

    def get_admin_server(self, id):
        servers=Server.query.filter_by(adminId=id)
        return [server.to_dict() for server in servers]
