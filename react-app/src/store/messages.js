const CREATE_MESSAGE='messages/CREATE_MESSAGE'
const UPDATE_MESSAGE='messages/EDIT_MESSAGE'
const DELETE_MESSAGE='messages/DELETE_MESSAGE'
const GET_MESSAGES="messages/GET_MESSAGES"
const UNLOAD_MESSAGES="messages/UNLOAD_MESSAGES"

const unloadmessages = ()=>({
    type: UNLOAD_MESSAGES
})


const getmessages = (messages) => ({
    type: GET_MESSAGES,
    messages
});

const createmessage = (message) => ({
    type: CREATE_MESSAGE,
    message
})

const editmessage = (message) => ({
    type: UPDATE_MESSAGE,
    message
})

const deletemessage = (message) => ({
    type: DELETE_MESSAGE,
    message

})


export const get_messages = (channelid) => async (dispatch) => {
    const response = await fetch(`/api/servers/channels/${channelid}/messages`);
    const data = await response.json()
    dispatch(getmessages(data.messages));

}

export const update_message = (messageid, content) => async (dispatch) => {
    console.log(content)
    const response = await fetch(`/api/servers/channels/messages/${messageid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    });

    const data = await response.json()


    dispatch(editmessage(data));


};

export const create_message = (content, channelid, username, userid, time) => async (dispatch) => {


    const response = await fetch(`/api/servers/channels/${channelid}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'userid': userid,
            "content": content,
            "username":username,
            "createdate": time

        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createmessage(data))
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

let initialState = {list:[]};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            let messagelist = []
            action.messages.forEach(message => {
                messagelist.push(message)
            })
            messagelist.sort((a,b)=>{
            return a.id-b.id })

            return {...state, list: messagelist}
        case CREATE_MESSAGE:



            state.list.push(action.message)
            return {...state}
        case UPDATE_MESSAGE:
            console.log(state.list)
            state.list.map((message)=>(
                 message.id === action.message.id?message.content= action.message.content:message.content



            ))


            return state
        case DELETE_MESSAGE:



            return state.list.filter(channel=>(
                channel.id != action.channel

            ))
        case UNLOAD_MESSAGES:
            initialState={list:[]}
            return initialState
        default:
            return state;
    }
}
