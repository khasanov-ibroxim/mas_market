import React from 'react';
import "./home.css"
import Navbar from "../../component/navbar/navbar.jsx";
import mas from "../../assets/icons/masOq.png"
import SectionPopularProduct from "../../component/section/Section_popular_product.jsx";
import SectionPopularService from "../../component/section/Section_popular_service.jsx";
import SectionHeroCategory from "../../component/section/Section_hero_category.jsx";
import cloud from "../../assets/icons/cloud.svg";
import energy from "../../assets/icons/energy.svg";
import OPT from "../../assets/icons/OPT.svg";
import time from "../../assets/icons/time.svg";
import Ostavaytes from "../../component/section/ostavaytes.jsx";
import Question from "../../component/section/question.jsx";
import HelpSection from "../../component/section/helpSection.jsx";

const Home = () => {
    return (
        <div>
            {/*<Navbar/>*/}
            <header>
                <h1>
                    РЕКЛАМА НОВОГО <br/> ПОКОЛЕНИЯ
                </h1>
            </header>

            <div className="container">
                <section className={"about"}>
                    <div className="about_box">
                        <div className="about_box-left">
                            <h1><span className={'under_line'}>Пара слов</span> о нас, производстве и брендинге</h1>
                            <p>
                                MAS Marketing — компания, специализирующаяся на создании качественной и эффективной
                                рекламы. Мы занимаемся производством баннеров, объемных букв, роллапов, стендов и других
                                рекламных материалов. Каждый наш продукт сочетает в себе высокое качество и креативный
                                подход, предлагая клиентам современные и запоминающиеся решения. Сотрудничая с нами, вы
                                сможете укрепить свой бренд и создать яркое впечатление для вашей аудитории.
                            </p>
                        </div>
                        <div className="about_box-right">
                            <img src={mas} alt="MASS Marketing"/>
                        </div>
                    </div>
                    <div className="about_box-bottom">
                        <div className="about_box-bottom_item">

                                <img src={cloud} alt=""/>


                                <h3>Высокое качество</h3>


                            <p style={{margin:0}}>Мы используем современные технологии и материалы, чтобы обеспечить долговечность и
                                привлекательный внешний вид каждого продукта.</p>
                        </div>
                        <div className="about_box-bottom_item">
                            <img src={time} alt=""/>
                            <h3>Индивидуальный подход</h3>
                            <p>Каждый проект уникален, и мы разрабатываем рекламные решения с учетом всех пожеланий и
                                потребностей клиента.</p>
                        </div>
                        <div className="about_box-bottom_item">
                            <img src={energy} alt=""/>
                            <h3>Оперативность </h3>
                            <p>Мы ценим ваше время и всегда стремимся завершить работы в установленные сроки, сохраняя
                                высокие стандарты качества.</p>
                        </div>
                        <div className="about_box-bottom_item">
                            <img src={OPT} alt=""/>
                            <h3>Креативность и инновации</h3>
                            <p>Наши специалисты постоянно ищут новые идеи и решения, чтобы ваша реклама выделялась и запоминалась.</p>
                        </div>
                    </div>
                </section>

                <SectionPopularProduct/>
                <SectionPopularService/>
                <SectionHeroCategory/>
                <Ostavaytes/>
                <Question/>
                <HelpSection/>
            </div>
        </div>
    );
};

export default Home;