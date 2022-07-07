from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Message, Channel, db, Server
server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def servers():
    servers = Server.query.all()
    return servers.get_users()


@server_routes.route('/<int:id>/channels')
@login_required
def channels(id):
    servers = Server.query.get(id)
    return servers.get_channels()




@server_routes.route('/<int:id>/channels/<int:channelid>', methods=['post'])
@login_required
def channels_edit(id, channelid):
    req = request.get_json()
    servers = Server.query.get(id)
    for channel in servers.get_channels():
        if channel.id == channelid:
            channel.name = req
            db.session.commit()

    return channelid




@server_routes.route('/<int:id>/channels/<int:channelid>', methods=['delete'])
@login_required
def delete_channel(id, channelid):
    req = request.get_json()
    servers = Server.query.get(id)
    for channel in servers.get_channels():
        if channel.id == channelid:
            foundchannel = Channel.query.get(channel.id)
            foundchannel.delete
            db.session.commit()

    return channelid
