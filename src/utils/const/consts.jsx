import AdminLayout from "../../pages/admin_page/layout/admin_layout.jsx";
import AdminProduct from "../../pages/admin_page/admin_product/admin_product.jsx";
import Home from "../../pages/Home/Home.jsx";
import Login from "../../pages/login/login.jsx";
import Category from "../../pages/admin_page/category/category.jsx";
import Product_page from "../../pages/product_page/product_page.jsx";
import Category_page from "../../pages/Category_page/category_page.jsx";
import Basket_page from "../../pages/basket/basket_page.jsx";
import Checkout from "../../pages/basket/checkout.jsx";
import ChangeProduct from "../../pages/admin_page/change_product/change_product.jsx";
import AdminEditProduct from "../../pages/admin_page/change_product/edit/admin_edit_product.jsx";
import About from "../../pages/about/about.jsx";

export const HOME = "/"
export const ABOUT = "/about"
export const CATEGORY_PAGE = "/category/:categoryId";
export const CATEGORY_PAGE_SOLO = "/category";
export const PRODUCT_PAGE = "/product/:productId"
export const BASKET_PAGE = "/basket";
export const CHECKOUT = "/checkout";

export const ADMIN_DASHBOARD = "/Administrator";
export const ADMIN_PRODUCTS = `${ADMIN_DASHBOARD}/Administrator_product`;
export const ADMIN_CATEGORY = `${ADMIN_DASHBOARD}/Administrator_category`;
export const ADMIN_CHANGE_PRODUCT = `${ADMIN_DASHBOARD}/Administrator_product_change`;
export const ADMIN_CHANGE_PRODUCT_EDIT = `${ADMIN_CHANGE_PRODUCT}/product_edit/:editID`; // Update this line

export const LOGIN = "Login"

export const Admin = [
    {
        Path: ADMIN_DASHBOARD,
        Component: <AdminLayout />
    },
    {
        Path: ADMIN_PRODUCTS,
        Component: <AdminProduct />
    },
    {
        Path: ADMIN_CATEGORY,
        Component: <Category />
    },
    {
        Path: ADMIN_CHANGE_PRODUCT,
        Component: <ChangeProduct />
    },
    {
        Path: ADMIN_CHANGE_PRODUCT_EDIT,
        Component: <AdminEditProduct />
    },
];
export const Public_router = [
    {
        Path:HOME,
        Component: <Home/>
    },
    {
        Path:ABOUT,
        Component: <About/>
    },
    {
        Path:LOGIN,
        Component: <Login/>
    },
    {
        Path:PRODUCT_PAGE,
        Component: <Product_page/>
    },
    {
        Path:CATEGORY_PAGE,
        Component: <Category_page/>
    },
    {
        Path:CATEGORY_PAGE_SOLO,
        Component: <Category_page/>
    },
    {
        Path:BASKET_PAGE,
        Component: <Basket_page/>
    },
    {
        Path:CHECKOUT,
        Component: <Checkout/>
    },

]