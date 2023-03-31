import axiosPrivateClient from '../axiosClient/axiosPrivateClient'

const foodEndpoints = {
    getFood: (id ) => `api/v1/foods/${id}`,
    listFoods: 'api/v1/foods/all',
    listFoodsWithCategory: ({cateId}) => `api/v1/foods/all/category/${cateId}`,
    listFoodsWithCategoryPaging:({cateId}) => `api/v1/foods/all/category/${cateId}/paging`,
    listFoodsPaging : 'api/v1/foods/all/paging',
    createFood : 'api/v1/foods/create',
    deleteFood :(id) => `api/v1/foods/delete/${id}`,
    updateFood: 'api/v1/foods/update' 
}

const foodApi = {
    getFood: async (id) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodEndpoints.getFood(id))
            return { response }
        } catch (err) { return { err } }
    },
    listFoods: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodEndpoints.listFoods)
            return { response }
        } catch (err) { return { err } }
    },
    listFoodsWithCategory: async (cateId) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodEndpoints.listFoodsWithCategory({ cateId }))
            return { response }
        } catch (err) { return { err } }
    },
    listFoodsWithCategoryPaging: async ({cateId}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodEndpoints.listFoodsWithCategoryPaging({ cateId }))
            return { response }
        } catch (err) { return { err } }
    },
    listFoodsPaging: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(foodEndpoints.listFoodsPaging)
            return { response }
        } catch (err) { return { err } }
    },
    createFood: async (image, food) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('food', JSON.stringify(food));
        try {
            console.log('send request')
            const response = await axiosPrivateClient.post(foodEndpoints.createFood, formData)
            return { response }
        } catch (err) { return { err } }
    },
    deleteFood: async (id) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.delete(foodEndpoints.deleteFood(id))
            return { response }
        } catch (err) { return { err } }
    },
    updateFood: async (image, food) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('food', JSON.stringify(food));
        try {
            console.log('send request')
            const response = await axiosPrivateClient.put(foodEndpoints.updateFood, formData)
            return { response }
        } catch (err) { return { err } }
    },
}

export default foodApi