from flask_socketio import SocketIO, emit, join_room, leave_room, send, rooms
import os

# create your SocketIO instance
socketio = SocketIO()


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://ioniq-app.herokuapp.com",
        "https://ioniq-app.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages


users = []
rooms = {}

@socketio.on("chat")
def handle_chat(data):

    room = data['channelId']
    emit("chat", data, room=room)

@socketio.on('join')
def joinroom(data):

    username = data['username']
    room = data['channelId']
    join_room(room)

    emit("welcome", f"{username}", room=room)

@socketio.on('connection')
def user_connection(data):
    print("connected", data['userId'])
    print(users)

    if data['userId'] not in users:
            users.append(data["userId"])
    print(users)
    emit('connection', {"users": users})



@socketio.on("disconnection")
def user_disconnection(data):
    print("disconnected", users)

    if data['userId'] in users:
        users.remove(data['userId'])
    print(users)
    emit ('disconnection', {'users': users})

@socketio.on('changeprofile')
def change_profile():
    print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    emit ('changeprofile')


@socketio.on('join-voice')
def joinroom(data):
    print(data, "LASDJFKSADFJKAJFKSJDAFJFKSJKFJLKFJFJAKSFJASKFJKFJASKFJ")

    userId = data['userId']
    room = int(data['channelid'])
    print(type(room), "LADSJFKLJKJAFJAKFJKSADFJKLSADJFLKSAFLKSADJFLKSADJFLKSDAJFLSKAJFLSKADJFLKSADJF")
    peerId = data['peerId']
    join_room(room)
    if room in rooms.keys() and userId not in rooms[room]:
        rooms[room].append(userId)
    else:
        rooms[room] = [userId]

    print (rooms, "SLDFJSLDFJKLASJFKLSDAJFLSADJFLSADJFLSADJFKSAJFKLSJAFLKJAKLFJSAKLDFJSAKLFJASLDF")

    emit("members", {"room":rooms[room], "peerId":peerId}, room=room)
