import React from 'react';
import "./sections.css"
import {Link} from "react-router-dom";
import ps1 from "../../assets/img/popularService/Laser.png"
import ps2 from "../../assets/img/popularService/A_drop.png"
import ps3 from "../../assets/img/popularService/Press.png"
import ps4 from "../../assets/img/popularService/Roller.png"


const SectionPopularService = () => {
    return (
        <section className={"section_popular_service"}>
            <h1>Популярные услуги</h1>

            <div className="section_popular_service_box">
                <div className="section_popular_service_box_item">
                    <img src={ps1} alt=""/>
                    <h1>Гравировка</h1>
                    <p>Нанесем на изделия логотип, рисунок или надпись</p>
                    <Link to={"#"}>Prosmotr</Link>
                </div>
                <div className="section_popular_service_box_item">
                    <img src={ps2} alt=""/>
                    <h1>Шелкография</h1>
                    <p>Изображения высоко качества на любых материалах</p>
                    <Link to={"#"}>Prosmotr</Link>
                </div>
                <div className="section_popular_service_box_item">
                    <img src={ps3} alt=""/>
                    <h1>Тиснение</h1>
                    <p>Нанесения рельефного рисунка</p>
                    <Link to={"#"}>Prosmotr</Link>
                </div>
                <div className="section_popular_service_box_item">
                    <img src={ps4} alt=""/>
                    <h1>Тампопечать</h1>
                    <p>Перенос изображения с помощью силиконового валика</p>
                    <Link to={"#"}>Prosmotr</Link>
                </div>
            </div>
        </section>
    );
};

export default SectionPopularService;