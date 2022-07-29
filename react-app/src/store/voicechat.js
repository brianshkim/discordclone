const OPEN_ROOM = "voicechat/OPEN_ROOM"
const SET_ROOM_DETAILS = "voicechat/SET_ROOM_DETAILS"
const SET_ACTIVE_ROOMS = "voicechat/SET_ACTIVE_ROOMS"
const SET_LOCAL_STREAM= "voicechat/SET_LOCAL_STREAM"
const SET_REMOTE_STREAMS="voicechat/SET_REMOTE_STREAMS"
const SET_AUDIO_ONLY = "voicechat/SET_AUDIO_ONLY"
const SET_SCREEN_SHARE_STREAM = "voicechat/SET_SCREEN_SHARE_STREAM"





const initialState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false
}

export const setOpenRoom = (isUserRoomCreator=false, isUserInRoom=false)=>{
    return{
        type: OPEN_ROOM,
        isUserRoomCreator,
        isUserInRoom,
    }
}

export default function reducer (state=initialState, action) {
    switch(action.type){
        case OPEN_ROOM:
            return {
                ...state,
                isUserInRoom: action.isUserInRoom,
                isUserRoomCreator: action.isUserRoomCreator
            }
        default:
            return state
    }

}
