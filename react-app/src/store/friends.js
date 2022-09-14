const GET_USERS_FRIENDS = "friends/GET_USERS_FRIENDS"


const load_users_friends = (friends) => ({
    type: GET_USERS_FRIENDS,
    friends
})


export const getallfriends = (userid) => async (dispatch) =>{
    const response = await fetch(`/api/users/${userid}/friends`);
    if (response.ok){
        const data = await response.json()

        dispatch(load_users_friends(data.friends))
    }


}


let initialState = {}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_FRIENDS:
            let friendlist = {}

            action.friends.forEach(user=>{
                friendlist[user.id] = user

            })
            return {...state, ...friendlist}

        default:
            return state
        }
    }
