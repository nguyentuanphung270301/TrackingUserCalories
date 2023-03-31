import HomePage from '../page/HomePage';
import Categories from '../page/Categories';
import FoodDetail from '../page/FoodDetail';
import UserFavorites from '../page/UserFavorites';
import FoodsSearch from '../page/FoodsSearch';
import FoodsByCategory from '../page/FoodsByCategory';
import UpdatePassword from '../page/UpdatePassword';
import AdminPage from '../page/AdminPage';
import Profile from '../page/Profile';
import TrackingPage from '../page/TrackingPage';


export const routesGen = {
    home: '/',
    categories: '/categories',
    foodDetail: (id) => `/foods/${id}`,
    userFavorites: (username) => `/favorites/${username}`,
    foodSearch: '/search',
    foodByCategory: (name,id) => `/category/${name}/${id}`,
    updatepassword: '/update-password',
    admin: '/admin',
    profile:(username) => `/profile/${username}`,
    tracking: '/tracking'
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
    },
    {
        path: '/update-password',
        element: <UpdatePassword/>,
        state:'updatepassword'
    },
    {
        path: '/admin',
        element: <AdminPage/>,
        state:'admin'
    },
    {
        path:'/profile/:username',
        element:<Profile/>,
        state:'profile'
    },
    {
        path:'/tracking',
        element:<TrackingPage/>,
        state:'tracking'
    }
]

export default routes
