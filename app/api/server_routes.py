from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Message, Channel, db, Server
server_routes = Blueprint('servers', __name__)


@server_routes.route('/servers')
@login_required
def servers():
    servers = Server.query.all()
    return {"allservers": [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>', methods=['post'])
@login_required
def user_edit_server(id):
    req = request.get_json()
    serverUser = Server.query.get(id)
    serverUser.name = req
    db.session.commit()

    return serverUser.to_dict()


@server_routes.route('/<int:id>', methods=['delete'])
@login_required
def user_delete_server(id):

    query_server = Server.query.filter_by(id=id)
    query_server.delete()
    db.session.commit()
    return jsonify(id)


@server_routes.route('/<int:id>/channels')
@login_required
def channels(id):
    servers = Server.query.get(id)
    serverchannels = servers.to_dict()
    print(serverchannels['channels'])
    return {"channels": serverchannels['channels']}


@server_routes.route('/channels/create', methods=['post'])
@login_required
def create_channels():
    req = request.get_json()
    newChannel = Channel(
        name=req['name'],
        userId=req['userid'],
        serverId=req['serverid']

    )
    db.session.add(newChannel)
    db.session.commit()
    return newChannel.to_dict()


@server_routes.route('/channels/<int:channelid>', methods=['post'])
@login_required
def channels_edit(channelid):
    req = request.get_json()
    channel = Channel.query.get(channelid)
    channel.name = req
    db.session.commit()
    return channel.to_dict()


@server_routes.route('/channels/<int:channelid>', methods=['delete'])
@login_required
def delete_channel(channelid):
    foundchannel = Channel.query.filter_by(id=channelid)
    foundchannel.delete()
    db.session.commit()
    return jsonify(channelid)
