import axiosClient from "../axiosClient/axiosPublicClient";

const authEndpoints = {
    forgot: '/api/v1/auth/forgot',
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register'
}

const authApi = {
    forgot: async (usernameOrPassword) => {
        try {
            console.log(usernameOrPassword)
            const response = await axiosClient.post(authEndpoints.forgot, { usernameOrPassword })
            return { response }
        }
        catch (err) { return { err } }
    },
    login: async ({ username, password }) => {
        try {
            const response = await axiosClient.post(authEndpoints.login, { username, password })
            return { response }
        }
        catch (err) { return {err } }

    },
    register: async ({ email, firstName, lastName, password, role, username }) => {
        try {
            const response = await axiosClient.post(authEndpoints.register, { email, firstName, lastName, password, role, username })
            return response
        }
        catch (err) { return { err } }
    }
}

export default authApi