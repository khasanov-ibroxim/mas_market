import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Import message from antd
import "./basket_page.css";
import krujka from "../../assets/img/s2_krujka.png";

const Checkout = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const DELIVERY_FEE = 30000;

    const [formData, setFormData] = useState({
        name: "",
        inn: "",
        phone: "",
        email: "",
        deliveryMethod: "pickup",
        address: "",
        comment: ""
    });

    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function numberFormatter(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const calculateTotalPrice = () => {
        const basketData = JSON.parse(localStorage.getItem("basket") || "[]");
        const itemTotal = basketData.reduce((acc, item) => {
            return acc + (parseFloat(item.price) * item.quantity);
        }, 0);

        const finalPrice = formData.deliveryMethod === "delivery"
            ? itemTotal + DELIVERY_FEE
            : itemTotal;

        setTotalPrice(finalPrice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

        const hasNumber = /\d/;

        // Validate name
        if (!formData.name || formData.name.trim().length === 0) {
            message.error("Введите ваше имя");
            setDisabled(false);
            return;
        }

        if (formData.name.trim().length <= 3 || hasNumber.test(formData.name)) {
            message.error("Введите ваше имя правильно");
            setDisabled(false);
            return;
        }

        // Validate phone number
        if (!formData.phone || formData.phone.trim().length < 17) {
            message.error("Введите ваш номер телефона правильно");
            setDisabled(false);
            return;
        }

        // Validate email
        if (!formData.email || formData.email.trim().length === 0) {
            message.error("Введите вашу почту");
            setDisabled(false);
            return;
        }

        // Construct the message for Telegram
        let msg = `<b>Новый заказ</b>\n`;
        msg += `Имя: ${formData.name}\n`;
        msg += `Телефон: ${formData.phone}\n`;
        msg += `Почта: ${formData.email || 'Не указана'}\n`;
        msg += `ИНН: ${formData.inn || 'Не указан'}\n`;
        msg += `Способ доставки: ${formData.deliveryMethod === "pickup" ? "Самовывоз" : "Доставка"}\n`;
        if (formData.deliveryMethod === "delivery") {
            msg += `Адрес: ${formData.address || 'Не указан'}\n`;
        }
        msg += `Комментарий: ${formData.comment || 'Без комментариев'}\n`;

        // Add ordered products
        const basketData = JSON.parse(localStorage.getItem("basket") || "[]");
        if (basketData.length > 0) {
            msg += `\n<b>Заказанные товары:</b>\n`;
            basketData.forEach((item, index) => {
                msg += `${index + 1}. ${item.name} - ${item.quantity} шт. x ${numberFormatter(item.price)} сум\n`;
            });
        } else {
            msg += `\n<b>Корзина пуста</b>\n`;
        }

        // Send message to Telegram
        const TOKEN = "7747449679:AAH4xQGOhH-WWMWuG2bGWrNoIlyvZTgkoBg";
        const CHAT_ID = "-1002287831360";

        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: msg
        })
            .then((res) => {
                if (res.status === 200) {
                    message.success("Сообщение успешно отправлено");
                    localStorage.setItem("basket", JSON.stringify([]));
                    // Clear form and navigate after a delay
                    setTimeout(() => window.location.href = "/", 3000);
                }
            })
            .catch((e) => {
                message.error("Произошла ошибка на сервере");
                setDisabled(false);
            });
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [formData.deliveryMethod]);

    return (
        <div className="basket-page">
            <div className="container">
                <h1>Оформление заказа</h1>
                <div className="basket_box">
                    <div className="basket_form">
                        <div className="basket_form_header">
                            <label className="basket_form_input">
                                <p>ФИО / Организация</p>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="basket_form_input">
                                <p>ИНН (не обязательно)</p>
                                <input
                                    type="text"
                                    placeholder="INN"
                                    name="inn"
                                    value={formData.inn}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="basket_form_2input">
                                <label className="basket_form_input">
                                    <p>Телефон</p>
                                    <input
                                        type="text"
                                        placeholder="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="basket_form_input">
                                    <p>Почта</p>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="basket_form_body">
                            <div className="basket_form_2input">
                                <label className="basket_form_input">
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="pickup"
                                        checked={formData.deliveryMethod === "pickup"}
                                        onChange={handleChange}
                                    />
                                    <span>Самовывоз</span>
                                </label>
                                <label className="basket_form_input">
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="delivery"
                                        checked={formData.deliveryMethod === "delivery"}
                                        onChange={handleChange}
                                    />
                                    <span>Доставка</span>
                                </label>
                            </div>
                        </div>
                        <div className="basket_form_footer">
                            <label className="basket_form_input">
                                <p>Адрес</p>
                                <input
                                    type="text"
                                    placeholder="Москва, ул. Пушкина д. 32 корп. 3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="basket_form_input">
                                <p>Комментарий</p>
                                <textarea
                                    placeholder="Что нам следует знать еще"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="basket_product">
                        <div className="basket_product_box_itog">
                            <p>Итог</p>
                            {formData.deliveryMethod === "delivery" && (
                                <p>Доставка по России {numberFormatter(DELIVERY_FEE)} сум</p>
                            )}
                            <h2>{numberFormatter(totalPrice)} сум</h2>
                        </div>
                        <div className="basket_product_box_send">
                            <h2>С вами свяжется специалист для уточнения заказа и оплаты.</h2>
                            <button onClick={handleSubmit} disabled={disabled}>Отправить заказ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
