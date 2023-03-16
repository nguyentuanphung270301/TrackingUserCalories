import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        username: null,
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                localStorage.removeItem('login');
                localStorage.removeItem('username');
            } else {
                if (action.payload.token) localStorage.setItem('login', action.payload.token);
            }
            state.user = action.payload;
        },
        setUsername(state, action){
            state.username = action.payload
            localStorage.setItem('username',state.username)
        }
    }
})

export const {
    setUser,
    setUsername,
    clearUsername
} = userSlice.actions

export default userSlice.reducer