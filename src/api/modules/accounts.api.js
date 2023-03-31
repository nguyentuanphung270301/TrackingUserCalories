import axiosPrivateClient from '../axiosClient/axiosPrivateClient'

const accountsEndpoints = {
    getAccount: ( username ) => `api/v1/accounts/${username}`,
    getAllAccounts: 'api/v1/accounts/all',
    getAllAccountsPaging: 'api/v1/accounts/all/paging',
    createAccount: 'api/v1/accounts/create',
    deleteAccount: (username) => `api/v1/accounts/delete/${username}`,
    updateAccount: 'api/v1/accounts/update',
    changePassword:'api/v1/accounts/changePwd'
}


const accountsApi = {
    getAccount: async (username) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(accountsEndpoints.getAccount(username ))
            return response
        } catch (err) { return { err } }
    },
    getAllAccounts: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(accountsEndpoints.getAllAccounts)
            return { response }
        } catch (err) { return { err } }
    },
    getAllAccountsPaging: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(accountsEndpoints.getAllAccountsPaging)
            return { response }
        } catch (err) { return { err } }
    },
    createAccount: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.post(accountsEndpoints.createAccount)
            return { response }
        } catch (err) { return { err } }
    },
    deleteAccount: async ( username ) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.delete(accountsEndpoints.deleteAccount( username ))
            return { response }
        } catch (err) { return { err } }
    },
    updateAccount: async (data) => {
        try {
            const response = await axiosPrivateClient.put(accountsEndpoints.updateAccount,data)
            return { response }
        } catch (err) { return { err } }
    },
    changePassword: async (data) => {
        try {
            const response = await axiosPrivateClient.put(accountsEndpoints.changePassword,data)
            return { response }
        } catch (err) { return { err } }
    },
}

export default accountsApi