from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import User, Server, db, Channel, serverlists

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/delete', methods=['delete'])
@login_required
def user_delete(id):
    user= User.query.get(id)
    user.delete()
    user.session.commit()
    return "success"

@user_routes.route('/<int:id>/servers')
@login_required
def user_servers(id):
    user= User.query.get(id)

    return {"servers": user.get_servers()}


@user_routes.route('/<int:id>/servers', methods=['POST'])
@login_required
def user_servers_create(id):
    req = request.get_json()
    newserver = Server(
        name=req,
        adminId=id
   )
    db.session.add(newserver)
    db.session.commit()
    newserverlist = newserver.to_dict()
    ins = serverlists.insert().values(userId=id, serverId=newserverlist['id'])
    conn = db.engine.connect()
    conn.execute(ins)
    return {"newserver": newserver.to_dict()}

@user_routes.route('/<int:id>/servers/join', methods=['POST'])
@login_required
def join_server(id):
    req=request.get_json()
    ins = serverlists.insert().values(userId=id, serverId=int(req))
    conn = db.engine.connect()
    conn.execute(ins)
    return jsonify(req)
