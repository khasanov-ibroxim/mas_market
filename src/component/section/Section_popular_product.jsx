import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./sections.css";
import photoOrVideo from "../../assets/img/login_truck.png"; // Assuming you have a CSS file for this component
import {ProductDB} from "./db/productDB.jsx";





const SectionPopularProduct = () => {
    const matches = useMediaQuery('(min-width:800px)');
    const [products, setProducts] = useState(ProductDB);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const getProducts = async () => {
    //     try {
    //         const res = await $API.get("/api/product-menu/");
    //         setProducts(res.data.results);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //         setError("Failed to load products.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     getProducts();
    // }, []);

    // if (loading) return <p>Loading products...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <section className="popular_product">
            <h1><span className="under_line">Популярные</span> и новые <br /> товары</h1>

            <div className="popular_swiper_box">
                <Swiper
                    slidesPerView={matches ? 4.5 : 1.7}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                        type: "progressbar"
                    }}
                    modules={[FreeMode, Pagination]}
                    className="popular_swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="popular_swiper_top">
                                <img
                                    src={product.photos_or_videos && product.photos_or_videos.length > 0
                                        ? product.photos_or_videos[0].file
                                        : photoOrVideo}
                                    alt={product.name || "Product image"}
                                />
                            </div>
                            <div className="popular_swiper_bottom">
                                <h2>{product.name}</h2>
                                <Link to={`/product/${product.id}`}>Посмотреть</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SectionPopularProduct;
