const LOAD_ALL_SERVERS = 'allservers/GET_ALL_SERVERS'
const JOIN_SERVER = 'allservers/JOIN_SERVER'


const loadservers = (servers) => ({
    type: LOAD_ALL_SERVERS,
    servers
});




export const load_servers = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/servers`);
    const data = await response.json()
    console.log(data)
    dispatch(loadservers(data.allservers));


}

let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_SERVERS:
            let serverlist = []
            action.servers.forEach(server => {
                serverlist.push(server)
            })
            serverlist.sort((a, b)=>{
                return a.id - b.id
            })
            return {...state, list: serverlist}


        default:
            return state;
    }
}
