import axiosPrivateClient from "../axiosClient/axiosPrivateClient";

const foodTrackingEndpoints = {
    addFoodTracking: ({userId, foodId, consumedGram}) => `api/v1/tracking/add/${userId}/${foodId}/${consumedGram}`,
    reportCalories: 'api/v1/tracking/report',
    getFoodTracking: ({userId}) => `api/v1/tracking/user/${userId}`
}

const foodTrackingApi = {
    addFoodTracking: async ({userId, foodId, consumedGram}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.post(foodTrackingEndpoints.addFoodTracking({ userId , foodId, consumedGram}))
            return { response }
        } catch (err) { return { err } }
    },
    reportCalories: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodTrackingEndpoints.reportCalories)
            return { response }
        } catch (err) { return { err } }
    },
    getFoodTracking: async ({userId}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodTrackingEndpoints.getFoodTracking({ userId}))
            return { response }
        } catch (err) { return { err } }
    },
}

export default foodTrackingApi