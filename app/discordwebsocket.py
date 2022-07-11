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
@socketio.on("chat")
def handle_chat(data):
    print("123123j1231j", data)
    room = data['channelId']
    emit("chat", data, room=room)

@socketio.on('join')
def joinroom(data):

    username = data['username']
    room = data['channelId']

    join_room(room)
    print("ASDFKAJKFLJSAKLFJASDKLFJSAD", room)
    print ("ASJJRJRKJWKLRJWKER", username)
    print(rooms)


    emit(username + ' has entered the room.', room=room)
