const LOAD_SERVERS = 'servers/GET_SERVERS'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const UPDATE_SERVER = 'servers/UPDATE_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'
const UNLOAD_SERVER = 'servers/UNLOAD_SERVER'


const getservers = (servers) => ({
    type: LOAD_SERVERS,
    servers
});

const createserver = (server) => ({
    type: CREATE_SERVER,
    server
})

const editserver = (server) => ({
    type: UPDATE_SERVER,
    server
})

const deleteserver = (server) => ({
    type: DELETE_SERVER,
    server

})

const unloadserver = ()=>({
    type: UNLOAD_SERVER
})

export const unload_server = () => async(dispatch)=>{
    dispatch(unloadserver())
}

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
        return data.newserver;
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


let initialState = {list:[]};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVERS:
            let serverlist = []
            action.servers.forEach(server => {
                serverlist.push(server)
            })
            serverlist.sort((a, b)=>{
                return a.name.localeCompare(b.name)
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

            return state.list.filter(server=>(
                server.id != action.server

            ))
        case UNLOAD_SERVER:
            initialState = {list:[]}
            return initialState


        default:
            return state;
    }
}
