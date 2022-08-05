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

    voice_bool=False
    if req['voice'] == "voice":
        voice_bool=True
    newChannel = Channel(
        name=req['name'],
        userId=req['userid'],
        serverId=req['serverid'],
        voice=voice_bool

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


@server_routes.route('/channels/<int:channelid>/messages', methods=['get'])
@login_required
def get_messages(channelid):
    foundmessages = Message.query.filter_by(channelId=channelid)
    return {"messages":[messages.to_dict() for messages in foundmessages]}

@server_routes.route('/channels/<int:channelid>/messages', methods=['post'])
@login_required
def create_messages(channelid):
    req = request.get_json()
    newmessage = Message(
        content=req["content"],
        channelId=channelid,
        userId=req['userid'],
        username=req['username'],
        createdate=req['createdate']

    )
    db.session.add(newmessage)
    db.session.commit()
    return newmessage.to_dict()


@server_routes.route('/channels/messages/<int:messageid>', methods=['post'])
@login_required
def edit_messages(messageid):
    req = request.get_json()
    print(req, "aldsfafjasfkal;fjksj;ffj;kasfjksd;jfkalsjfkalsdfjk;slfja")
    foundmessage = Message.query.get(messageid)
    foundmessage.content=req
    foundmessage.createdate=foundmessage.createdate
    db.session.commit()
    return foundmessage.to_dict()
