const LOAD_SERVERS = 'servers/GET_SERVERS'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'


const getservers = (servers) => ({
    type: LOAD_SERVERS,
    servers
});

const createserver = (server) => ({
    type: CREATE_SERVER,
    server
})

const editserver = (server) => ({
    type: EDIT_SERVER,
    server
})

const deleteserver = (server) => ({
    type: DELETE_SERVER,
    server

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
    const response = await fetch(`/api/users/${id}/servers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
    });

    const data = await response.json()

    dispatch(editserver(data));


};


export const delete_server = (id, name) => async (dispatch) => {
    const response = await fetch(`/api/${id}/servers`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteserver(data));
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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SERVERS:
            let serverlist = {}
            action.servers.forEach(server => {
                serverlist[server.id] = server
            })
            return { ...serverlist, ...state }
        case CREATE_SERVER:
            return {
                ...state,
                [action.server.id]: {
                    ...state[action.server.id],
                    ...action.server,
                },
            };


        default:
            return state;
    }
}
