import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CHECKOUT } from "../../../utils/const/consts.jsx";

function BottomBar({ info }) {
    const [counter, setCounter] = useState(1); // counter ni boshqarish

    // Funksiya: Narxni miqdorga qarab olish
    function getPriceByQuantity(quantity) {
        if (!info.price || !Array.isArray(info.price)) {
            // Agar info.price massiv bo'lmasa, default narxni qaytaramiz
            return 0; // Yoki default narx
        }

        let price = 0;

        // price massividagi har bir obyektni tekshiramiz
        for (const priceObj of info.price) {
            for (const key in priceObj) {
                const minQuantity = parseInt(key.split('_')[1], 10); // price_10 dan 10 ni oladi
                // Agar quantity minQuantity ga teng yoki katta bo'lsa, o'sha narxni olamiz
                if (counter >= minQuantity) {
                    price = priceObj[key]; // Mos keladigan narxni olamiz
                }
            }
        }

        // Agar narxni topolmasak, default narxni qaytaramiz
        return price || 0;
    }

    // Bitta mahsulot uchun narxni olish
    const singleProductPrice = getPriceByQuantity(1); // Bitta mahsulot narxini olish
    const totalPrice = singleProductPrice * counter; // Umumiy narx (counter ni miqdor sifatida ishlatamiz)

    const navigate = useNavigate();

    // Raqamni formatlash
    function numberFormatter(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Savatga mahsulot qo'shish
    const handleAddToBasket = () => {
        const product = {
            name: info.name,
            id: info.id,
            quantity: counter,
            price: getPriceByQuantity(counter), // Dinamik narx (counter asosida)
        };

        const basket = JSON.parse(localStorage.getItem('basket')) || []; // Savatni olish

        // Agar mahsulot mavjud bo'lsa, uning miqdorini oshiramiz
        const existingProductIndex = basket.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            basket[existingProductIndex].quantity += counter;
        } else {
            basket.push(product); // Yangi mahsulotni qo'shamiz
        }

        // Yangilangan savatni saqlaymiz
        localStorage.setItem('basket', JSON.stringify(basket));
    };

    return (
        <div className='product-details-2'>
            <div className="prise-sale">
                <div>
                    <span>Итог</span>
                    <b>{numberFormatter(singleProductPrice)} So'm</b>
                </div>
                <div>
                    <b>{numberFormatter(totalPrice)} So'm</b>
                </div>
            </div>

            <div className="button-container">
                <button className="cart-button" onClick={handleAddToBasket}>
                    В корзину
                </button>

                <div className="quantity-control">
                    <button onClick={() => setCounter(counter > 1 ? counter - 1 : 1)}>-</button>
                    <div className="quantity">{counter}</div>
                    <button onClick={() => setCounter(counter + 1)}>+</button>
                </div>
            </div>

            <button className="constructor-button" onClick={() => {
                handleAddToBasket();
                navigate(CHECKOUT);
            }}>
                Купить в один клик
            </button>
        </div>
    );
}

export default BottomBar;
