import React, {useState} from 'react';
import "./contact.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Contact = () => {
    const [initialState, setInitialState] = useState({})

    return (
        <div>
            <div className="contact_box">
                <span className="big-circle"></span>
                {/*<img src="img/shape.png" className="square" alt="" />*/}
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">Контакты</h3>
                        <p className="text">
                            Мы всегда рады вас слышать и отвечать на ваши вопросы! Свяжитесь с нами любым удобным для
                            вас способом:
                        </p>

                        <div className="info">
                            <div className="information">
                                <LocationOnIcon/>
                                <a href="#">Республика Узбекистан, город Ташкент, улица Джами, 229</a>
                            </div>
                            <div className="information">
                                <EmailIcon/>
                                <a href="#">office@masmarket.uz</a>
                            </div>
                            <div className="information">
                                <LocalPhoneIcon/>
                                <a href="tel:+998555001444">+998 55 500 14 44</a>
                            </div>
                        </div>

                        <div className="social-media">
                            <p>Социальные сети:</p>
                            <div className="social-icons">
                                <a href="#">
                                    <TelegramIcon/>
                                </a>
                                <a href="#">
                                    <InstagramIcon/>
                                </a>
                                <a href="#">
                                    <FacebookIcon/>
                                </a>
                                <a href="#">
                                    <WhatsAppIcon/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>

                        <div className={"contact_form"}>
                            <h3 className="title">Связаться с нами</h3>
                            <div className="input-container">
                                <input type="text"
                                       placeholder={"Ваше имя"}
                                       name="name" className="inputContact"
                                       value={initialState?.username}
                                       onChange={e => setInitialState({...initialState, username: e.target.value})}
                                />

                            </div>
                            <div className="input-container">
                                <input type="email"
                                       placeholder={"почта"}
                                       value={initialState?.email}
                                       onChange={e => setInitialState({...initialState, email: e.target.value})}
                                       name="email" className="inputContact"/>
                            </div>
                            <div className="input-container">
                                <input type="tel" name="phone"
                                       placeholder={"номер телефона"}
                                       className="inputContact"
                                       value={initialState?.phone}
                                       onChange={e => {
                                           const formattedValue = e.target.value.replace(/\D/g, '');
                                           let formattedNumber = '+998';
                                           if (formattedValue.length > 3) {
                                               formattedNumber += ' ' + formattedValue.substring(3, 5);
                                           }
                                           if (formattedValue.length > 5) {
                                               formattedNumber += ' ' + formattedValue.substring(5, 8);
                                           }
                                           if (formattedValue.length > 8) {
                                               formattedNumber += ' ' + formattedValue.substring(8, 10);
                                           }
                                           if (formattedValue.length > 10) {
                                               formattedNumber += ' ' + formattedValue.substring(10, 12);
                                           }
                                           setInitialState({...initialState, phone: formattedNumber});
                                       }}
                                />
                            </div>
                            <div className="input-container textarea">
                                <textarea name="message" className="inputContact"
                                          placeholder={"сообщение"}
                                          value={initialState?.msg}
                                          onChange={e => setInitialState({...initialState, msg: e.target.value})}
                                ></textarea>
                            </div>
                            <button className={"btn-contact"}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Contact;