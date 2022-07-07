const LOAD_SERVERS = 'servers/GET_CHANNELS'
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



export const get_servers = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/servers`);
    const data = await response.json()
    dispatch(getservers(data.servers));

}

export const create_server = (id, name) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/servers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createserver(data.newserver))
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

export const update_server = (id, name) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
    });

    const data = await response.json()
    console.log(data)

    dispatch(editserver(data));


};


export const delete_server = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteserver(Number(data)));
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



export default function reducer(state = [], action) {
    switch (action.type) {
        case LOAD_SERVERS:
            let serverlist = []
            action.servers.forEach(server => {
                serverlist.push(server)
            })
            serverlist.sort((a, b)=>{
                return a.id - b.id
            })
            return {...state, list: serverlist}
        case CREATE_SERVER:

            state.list.push(action.server)
            return {...state}
        case UPDATE_SERVER:
            let newstate = state.list.map((server)=>{
                if( server.id === action.server.id){
                    server.name = action.server.name
                }
                return server

            })

            return newstate
        case DELETE_SERVER:
            console.log(action.server)
            console.log(state.servers)


            return state.list.filter(server=>(
                server.id != action.server

            ))

        default:
            return state;
    }
}
