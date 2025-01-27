import React from 'react';
import "./sections.css"
import arrowRight from "../../assets/icons/arrowRight.svg";

const HelpSection = () => {
    return (
        <section className="helpSection">
            <div className="helpSection_box">
                <div className="helpSection_left">
                    <h1>Нужна помощь?</h1>
                    <p>Оставьте свои данные — мы перезвоним и решим вопрос. Помните, оставляя контакты вы даете согласие
                        на обработку персональных данных.</p>
                </div>
                <div className="helpSection_right">
                    <div className="helpSection_left_input">
                        <p>Имя</p>
                        <input type="text" placeholder={"Имя"}/>
                    </div>
                    <div className="helpSection_left_input">
                        <p>Телефон</p>
                        <span>
                              <input type="text" placeholder={"+998"}/>
                        <button><img src={arrowRight} alt=""/></button>
                        </span>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpSection;