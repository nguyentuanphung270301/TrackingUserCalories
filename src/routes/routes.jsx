import HomePage from '../page/HomePage';
import Categories from '../page/Categories';
import FoodDetail from '../page/FoodDetail';
import UserFavorites from '../page/UserFavorites';
import FoodsSearch from '../page/FoodsSearch';
import FoodsByCategory from '../page/FoodsByCategory';

export const routesGen = {
    home: '/',
    categories: '/categories',
    foodDetail: (id) => `/foods/${id}`,
    userFavorites: (username) => `/favorites/${username}`,
    foodSearch: '/search',
    foodByCategory: (name,id) => `/category/${name}/${id}`
}

const routes = [
    {
        index: true,
        element: <HomePage/>,
        state: "home"
    },
    {
        path: '/categories',
        element: <Categories/>,
        state: 'categories'
    },
    {
        path: '/foods/:id',
        element: <FoodDetail/>,
        state:'foods'
    },
    {
        path:'/favorites/:username',
        element: <UserFavorites/>,
        state: 'favorites'
    },
    {
        path: '/search',
        element: <FoodsSearch/>,
        state: 'search'
    },
    {
        path: '/category/:name/:id',
        element: <FoodsByCategory/>,
        state: 'foodbycategory'
    }
]

export default routes
