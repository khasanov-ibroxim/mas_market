import React, { useEffect, useState } from 'react';
import "./category_page.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { $API } from "../../utils/http.jsx";
import hc1 from "../../assets/img/hero_category/HDD.png";
import krujka from "../../assets/img/s2_krujka.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import arrowLeft from "../../assets/icons/pageLeft.svg";
import arrowRight from "../../assets/icons/pageRight.svg";
import {PRODUCT_PAGE} from "../../utils/const/consts.jsx";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 10;
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(false);

    const getCategory = async () => {
        try {
            const response = await $API.get("/admin-api/category-list/");
            setCategoryList(response.data.results);
        } catch (e) {
            console.log(e);
        }
    };

    const getProduct = async () => {
        try {
            const response = await $API.get("/api/product-menu/", {
                params: {
                    category: categoryId,
                    page: currentPage,
                    page_size: productsPerPage,
                }
            });
            setProductList(response.data.results);
            setTotalProducts(response.data.count);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCategory();
        getProduct();
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 980);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [categoryId, currentPage]);

    const handleCategoryClick = (clickedCategoryId) => {
        if (parseInt(categoryId) === clickedCategoryId) {
            navigate("/category");
        } else {
            navigate(`/category/${clickedCategoryId}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(productList)
    return (
        <div className="category_page container">
            <div className="category_page_categories">
                <h1>Категория</h1>

                {isMobileView ? (
                    <Swiper spaceBetween={10} slidesPerView={2.5} pagination={{ clickable: true }}>
                        {categoryList?.map((category) => (
                            <SwiperSlide key={category.id}>
                                <div
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`section_hero_category_item ${category.id === parseInt(categoryId) ? 'selected_category' : ''}`}
                                >
                                    <div className="section_hero_category_item_img">
                                        <img src={category.imageUrl || hc1} alt={category.name} />
                                    </div>
                                    <div className="section_hero_category_item_text">
                                        <p>{category.name}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="category_page_categories_box">
                        {categoryList?.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`section_hero_category_item ${category.id === parseInt(categoryId) ? 'selected_category' : ''}`}
                            >
                                <div className="section_hero_category_item_img">
                                    <img src={category.imageUrl || hc1} alt={category.name} />
                                </div>
                                <div className="section_hero_category_item_text">
                                    <p>{category.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="category_product_component">
                <div className="category_product_component_title">
                    <h1>Selected category name</h1>
                </div>
                <div className="category_product_component_box">
                    {productList.length > 0 ? productList.map((product, index) => (
                        <div className="categoryPage_product_item" key={index} onClick={()=>{navigate(PRODUCT_PAGE.replace(":productId", product.id))}}>
                            <div className="popular_swiper_top">
                                <img src={product.photos_or_videos[0]?.file || krujka} alt={product.name} />
                            </div>
                            <div className="popular_swiper_bottom">
                                <h2>{product.name}</h2>
                                <span>{product.price} сум</span>
                            </div>
                        </div>
                    )) : <p>No products found</p>}
                </div>
                {/* Pagination */}
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        <img src={arrowLeft} alt="" />
                    </button>

                    {pages.map((pageNumber) => (
                        <span
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={pageNumber === currentPage ? 'active' : ''}
                        >
                            {pageNumber}
                        </span>
                    ))}

                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <img src={arrowRight} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
