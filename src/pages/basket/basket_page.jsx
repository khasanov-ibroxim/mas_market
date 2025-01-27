import React, { useEffect, useState } from 'react';
import './basket_page.css';
import mas from "../../assets/img/s2_krujka.png";
import { Link } from "react-router-dom";
import {CHECKOUT, PRODUCT_PAGE} from "../../utils/const/consts.jsx";

const BasketPage = () => {
    const [products, setProducts] = useState([]);

    // Narxni miqdorga qarab olish
    function getPriceByQuantity(product, quantity) {
        if (!product.price || !Array.isArray(product.price)) {
            // Agar product.price massiv bo'lmasa, default narxni qaytaramiz
            return product.price || 0; // Yoki default narx
        }

        let price = 0;
        // price massividagi har bir obyektni tekshiramiz
        for (const priceObj of product.price) {
            for (const key in priceObj) {
                const minQuantity = parseInt(key.split('_')[1], 10); // price_10 dan 10 ni oladi
                // Agar quantity minQuantity ga teng yoki katta bo'lsa, o'sha narxni olamiz
                if (quantity >= minQuantity) {
                    price = priceObj[key]; // Mos keladigan narxni olamiz
                }
            }
        }

        // Agar narxni topolmasak, default narxni qaytaramiz
        return price || product.price || 0;
    }

    // Raqamni formatlash
    function numberFormatter(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    useEffect(() => {
        // Load basket from localStorage on component mount
        const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
        setProducts(storedBasket);
    }, []);

    const updateLocalStorage = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem('basket', JSON.stringify(updatedProducts));
    };

    const onIncreaseQuantity = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            quantity: (updatedProducts[index].quantity || 1) + 1
        };
        updateLocalStorage(updatedProducts);
    };

    const onDecreaseQuantity = (index) => {
        const updatedProducts = [...products];
        const newQuantity = (updatedProducts[index].quantity || 1) - 1;
        updatedProducts[index] = {
            ...updatedProducts[index],
            quantity: newQuantity > 0 ? newQuantity : 1
        };
        updateLocalStorage(updatedProducts);
    };

    const onRemoveProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        updateLocalStorage(updatedProducts);
    };

    return (
        <div className="basket">
            <div className="container">
                <h1>Корзина</h1>
                <ul className="products">
                    {products.length > 0 ? (
                        <div>
                            {products.map((product, index) => {
                                const productPrice = getPriceByQuantity(product, product.quantity); // Mahsulot narxini olish
                                const totalPrice = productPrice * (product.quantity || 1); // Umumiy narxni hisoblash
                                return (
                                    <li className="row" key={product.id || index}>
                                        <div className="col left">
                                            <div className="thumbnail">
                                                <a href="#">
                                                    <img
                                                        src={product.photos_or_videos && product.photos_or_videos.length > 0
                                                            ? product.photos_or_videos[0].file
                                                            : mas}
                                                        alt={product.name}
                                                    />
                                                </a>
                                            </div>
                                            <div className="detail">
                                                <div className="name">
                                                    <Link to={PRODUCT_PAGE.replace(':productId', product.id)}>
                                                        {product.name}
                                                    </Link>
                                                </div>
                                                <div className="price">{numberFormatter(totalPrice)} сум</div>
                                            </div>
                                        </div>
                                        <div className="col right">
                                            <div className="quantity-control">
                                                <button onClick={() => onDecreaseQuantity(index)}>-</button>
                                                <div className="quantity-value">{product.quantity || 1}</div>
                                                <button onClick={() => onIncreaseQuantity(index)}>+</button>
                                            </div>
                                            <div className="remove">
                                                <svg
                                                    onClick={() => onRemoveProduct(index)}
                                                    version="1.1"
                                                    className="close"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 60 60"
                                                    enableBackground="new 0 0 60 60"
                                                >
                                                    <polygon
                                                        points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                            <Link to={CHECKOUT} className={"products_basket_btn"}>Buyurtma berish</Link>
                        </div>
                    ) : (
                        <p>Product yo'q</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default BasketPage;
