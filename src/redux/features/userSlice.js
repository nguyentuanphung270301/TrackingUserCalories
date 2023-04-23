import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        username: null,
        foodId: null
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                localStorage.removeItem('login');
                localStorage.removeItem('username');
                state.username = action.payload
            } else {
                if (action.payload.token) localStorage.setItem('login', action.payload.token);
            }
            state.user = action.payload;
        },
        setUsername(state, action) {
            state.username = action.payload
            localStorage.setItem('username', state.username)
        },
        setFoodId(state, action) {
            state.foodId = action.payload
        }
    }
})

export const {
    setUser,
    setUsername,
    setFoodId
} = userSlice.actions

export default userSlice.reducer