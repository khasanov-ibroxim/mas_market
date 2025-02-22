import React, {useEffect} from 'react';
import "./footer.css"
import mas from "../../assets/icons/masOq.png"
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Link} from "react-router-dom";


const Footer = () => {
    useEffect(() => {
        // Sahifa yuklanganida fokusni olib tashlaydi
        document.activeElement.blur();
    }, []);
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-map-marker-alt"></i>
                                <div className="cta-text">
                                    <h4>Адрес</h4>
                                    <span>Республика Узбекистан, город Ташкент, улица Джами, 229</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-phone"></i>
                                <div className="cta-text">
                                    <h4>номер телефона</h4>
                                    <a href="tel:+998555001444">+998 55 500 14 44</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="far fa-envelope-open"></i>
                                <div className="cta-text">
                                    <h4>почта</h4>
                                    <a href="#">office@masmarket.uz</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <a href="#"><img src={mas} className="img-fluid" alt="logo"/></a>
                                </div>
                                <div className="footer-text">
                                    <p> Мы всегда рады вас слышать и отвечать на ваши вопросы! Свяжитесь с нами любым удобным для
                                        вас способом</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footer-social-icon">
                                <span>Социальные сети</span>
                                <a href="#"><TelegramIcon/></a>
                                <a href="#"><InstagramIcon/></a>
                                <a href="#"><FacebookIcon/></a>
                                <a href="#"><WhatsAppIcon/></a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Меню</h3>
                                </div>
                                <ul>
                                    <li><Link to="/">Главная</Link></li>
                                    <li><Link to="/about">О компании</Link></li>
                                    <li><Link to="/">Услуги</Link></li>
                                    <li><Link to="/contact">Контакты</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2024, All Right Reserved <a href="https://t.me/Khasanov_ibroxim">Masmarket.uz</a></p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div className="footer-menu">
                                <ul>
                                    <li><Link to="/">Главная</Link></li>
                                    <li><Link to="/about">О компании</Link></li>
                                    <li><Link to="/">Услуги</Link></li>
                                    <li><Link to="/contact">Контакты</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;