import axiosPrivateClient from "../axiosClient/axiosPrivateClient";

const categoryEndpoints = {
    findCategory: ({id}) => `api/v1/categories/${id}`,
    listCategories: 'api/v1/categories/all',
    listCategoriesPaging : 'api/v1/categories/all/paging',
    createCategory: 'api/v1/categories/create',
    deleteCategory: ({id}) => `api/v1/categories/delete/${id}`,
    updateCategory : 'api/v1/categories/update'
}

const categoryApi = {
    findCategory: async ({id}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(categoryEndpoints.findCategory({ id }))
            return { response }
        } catch (err) { return { err } }
    },
    listCategories: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(categoryEndpoints.listCategories)
            return {response }
        } catch (err) { return { err } }
    },
    listCategoriesPaging: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.get(categoryEndpoints.listCategoriesPaging)
            return { response }
        } catch (err) { return { err } }
    },
    createCategory: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.post(categoryEndpoints.createCategory)
            return { response }
        } catch (err) { return { err } }
    },
    deleteCategory: async ({id}) => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.delete(categoryEndpoints.deleteCategory({id}))
            return { response }
        } catch (err) { return { err } }
    },
    updateCategory: async () => {
        try {
            console.log('send request')
            const response = await axiosPrivateClient.put(categoryEndpoints.updateCategory)
            return { response }
        } catch (err) { return { err } }
    },
}

export default categoryApi