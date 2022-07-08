const LOAD_CHANNELS = 'servers/GET_CHANNELS'
const CREATE_CHANNEL = 'servers/CREATE_CHANNEL'
const UPDATE_CHANNEL = 'servers/UPDATE_CHANNEL'
const DELETE_CHANNEL = 'servers/DELETE_CHANNEL'


const getchannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
});

const createchannel = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})

const editchannel = (channel) => ({
    type: UPDATE_CHANNEL,
    channel
})

const deletechannel = (channel) => ({
    type: DELETE_CHANNEL,
    channel

})



export const get_channels = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}/channels`);
    const data = await response.json()
    dispatch(getchannels(data.channels));

}

export const create_channel = (userid, serverid, name) => async (dispatch) => {
    console.log("11112")
    const response = await fetch(`/api/servers/channels/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'userid': userid,
            "serverid": serverid,
            "name": name,

        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createchannel(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const update_channel = (channelid, name) => async (dispatch) => {
    const response = await fetch(`/api/servers/channels/${channelid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
    });

    const data = await response.json()
    console.log(data)

    dispatch(editchannel(data));


};


export const delete_channel = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/servers/channels/${channelId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deletechannel(Number(data)));
}



//export const  = () => async (dispatch) => {
//  const response = await fetch('/api/auth/logout', {
//    headers: {
//      'Content-Type': 'application/json',
//    }
//  });
//
//  if (response.ok) {
//    dispatch(removeUser());
//  }
//};
//
//
//export const signUp = (username, email, password) => async (dispatch) => {
//  const response = await fetch('/api/auth/signup', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify({
//      username,
//      email,
//      password,
//    }),
//  });
//
//  if (response.ok) {
//    const data = await response.json();
//    dispatch(setUser(data))
//    return null;
//  } else if (response.status < 500) {
//    const data = await response.json();
//    if (data.errors) {
//      return data.errors;
//    }
//  } else {
//    return ['An error occurred. Please try again.']
//  }
//}

let initialState = {};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CHANNELS:
            let channellist = []
            action.channels.forEach(channel => {
                channellist.push(channel)
            })
            channellist.sort((a, b)=>{
                return a.id - b.id
            })
            return {...state, list: channellist}
        case CREATE_CHANNEL:

            state.list.push(action.channel)
            return {...state}
        case UPDATE_CHANNEL:
            let newstate = state.list.map((channel)=>{
                if( channel.id === action.channel.id){
                    channel.name = action.channel.name
                }
                return channel

            })

            return newstate
        case DELETE_CHANNEL:
            console.log(action.channel)
            console.log(state.channels)


            return state.list.filter(channel=>(
                channel.id != action.channel

            ))

        default:
            return state;
    }
}
