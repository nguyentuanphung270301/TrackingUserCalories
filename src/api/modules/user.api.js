import axiosPrivateClient from "../axiosClient/axiosPrivateClient";

const userEndpoints = {
    getUser: ({ userId }) => `api/v1/users/${userId}`,
    getAllUser: 'api/v1/users/all',
    getAllUSerPaging: 'api/v1/users/all/paging',
    createUser: 'api/v1/users/create',
    deleteUser: ({ userId }) => `api/v1/users/delete/${userId}`,
    updateUser: 'api/v1/users/update'
}

const userApi = {
    getUser: async ({ userId }) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(userEndpoints.getUser({ userId }))
            return { response }
        } catch (err) { return { err } }
    },
    getAllUser: async () => {
        try {
            const response = await axiosPrivateClient.get(userEndpoints.getAllUser)
            return  response
        } catch (err) { return { err } }
    },
    getAllUSerPaging: async ({pageNo, pageSize, sortBy}) => {
        try {
            const response = await axiosPrivateClient.get(userEndpoints.getAllUSerPaging,{pageNo, pageSize, sortBy})
            return { response }
        } catch (err) { return { err } }
    },
    createUser: async ({ dob, email, firstName, gender, height, userId, image, lastName, weigth }) => {
        try {
            const response = await axiosPrivateClient.post(userEndpoints.createUser, { dob, email, firstName, gender, height, userId, image, lastName, weigth })
            return { response }
        } catch (err) { return { err } }
    },
    deleteUser: async ({userId}) => {
        try {
            const response = await axiosPrivateClient.delete(userEndpoints.deleteUser, {userId})
            return { response }
        } catch (err) { return { err } }
    },
    updateUser: async ({ dob, email, firstName, gender, height, userId, image, lastName, weigth }) => {
        try {
            const response = await axiosPrivateClient.put(userEndpoints.updateUser, { dob, email, firstName, gender, height, userId, image, lastName, weigth })
            return { response }
        } catch (err) { return { err } }
    },
}

export default userApi