import axiosPrivateClient from "../axiosClient/axiosPrivateClient";

const favoriteEndpoints = {
    getListFavoriteFood: ({ userId }) => `api/v1/favfoods/${userId}`,
    addFavoriteFood: ( userId, foodId ) => `api/v1/favfoods/add/${userId}/${foodId}`,
    deleteFavoriteFood: ({ userId, foodId }) => `api/v1/favfoods/delete/${userId}/${foodId}`
}

const favoriteFoodApi = {
    getListFavoriteFood: async(userId) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(favoriteEndpoints.getListFavoriteFood(userId))
            return { response }
        } catch (err) { return { err } }
    },
    addFavoriteFood: async(userId, foodId) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.post(favoriteEndpoints.addFavoriteFood( userId, foodId ))
            return { response }
        } catch (err) { return { err } }
    },
    deleteFavoriteFood: async({userId, foodId}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.delete(favoriteEndpoints.deleteFavoriteFood({ userId, foodId }))
            return { response }
        } catch (err) { return { err } }
    },
}

export default favoriteFoodApi