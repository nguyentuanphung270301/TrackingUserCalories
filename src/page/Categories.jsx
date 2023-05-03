import React, { useEffect, useState } from 'react'
import categoryApi from '../api/modules/category.api'
import FoodGrids from '../components/common/FoodGrids'
import { toast } from 'react-toastify'
import FoodSlide from '../components/common/FoodSlide'

const Categories = () => {
    const [categoryList, setCategoryList] = useState([])


    useEffect(() => {
        const getCategory = async () => {
            const { response, err } = await categoryApi.listCategories()
            if (response) {
                setCategoryList(response)
                console.log(response)

            }
            if (err) toast.error('Please login')
        }
        getCategory()
    }, [])


    return (
        <>
            <FoodSlide />
            <FoodGrids categories={categoryList} />
        </>
    )
}

export default Categories