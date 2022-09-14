
const GET_USERS = 'allusers/GET_USERS'



const load_users = (users) =>({
    type: GET_USERS,
    users
});



export const getallusers = () => async (dispatch) =>{
    const response = await fetch('/api/users/');
    if (response.ok){
        const data = await response.json()

        dispatch(load_users(data.users))
    }


}



let initialState = {}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            let userlist = {}
            action.users.forEach(user => {
                userlist[user.id] = user
            })

            return {...state, ...userlist}


        default:
            return state
        }
    }
