import React from 'react';
import "./about.css"

import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Autoplay} from "swiper/modules";
import useMediaQuery from "@mui/material/useMediaQuery";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import narujniy_reklama from "../../assets/about_img/narujniy_reklama.png"
import Question from "../../component/section/question.jsx";
import logo from "../../assets/icons/masOq.png"

const About = () => {
    const matches = useMediaQuery('(min-width:800px)');
    return (
        <div className={"container"}>
            <div className="about-s1">
                <div className="row ">
                    <div className="col-lg-6">
                        <h1><span className={'under_line'}>О компании</span></h1>
                        <p>
                            <b>MAS market</b> – это современная рекламно-производственная компания, специализирующаяся
                            на
                            создании наружной и интерьерной рекламы, бизнес-сувениров и оформлении мероприятий любой
                            сложности. Мы работаем с клиентами по принципу «от идеи до готового решения», обеспечивая
                            полный цикл услуг: от разработки дизайн-концепции до профессионального монтажа и
                            сопровождения проекта.
                        </p>
                        <p>
                            <b>Наша миссия : </b>
                            Помогать бизнесу выделяться на конкурентном рынке, создавая заметные, качественные и
                            креативные рекламные решения, которые приносят реальную отдачу.
                        </p>
                        <p>
                           <b>Наши клиенты : </b>
                            Среди наших клиентов – как крупные федеральные компании, так и молодые стартапы, а также
                            представители среднего и малого бизнеса. Мы умеем находить подход к каждому, кто
                            заинтересован в развитии и продвижении своего бренда, товара или услуги.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        {/*<img src={about_s1} alt="" width={"100%"} height={"100%"}/>*/}
                    </div>
                </div>
                <div className="row about-s1_partners">
                    <Swiper
                        slidesPerView={matches ? 4 : 2}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                        }}
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="about_partners"
                    >
                        <SwiperSlide>
                            <img src={logo} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={logo} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={logo} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={logo} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={logo} alt=""/>
                        </SwiperSlide>
                        <div className="swiper-button-prev">
                            <LeftOutlined/>
                        </div>
                        <div className="swiper-button-next">
                            <RightOutlined/>
                        </div>
                    </Swiper>
                </div>
            </div>

            <div className="about-s2">
                <div className="row">
                    <div className="col-lg-6">
                        {/*<img src={about_s1} alt=""/>*/}
                    </div>
                    <div className="col-lg-6">
                        <h1><span className={'under_line'}>Наша команда</span></h1>
                        MAS market – это команда профессионалов, увлечённых своим делом. Дизайнеры, инженеры, менеджеры
                        по
                        проектам и монтажные бригады – все мы работаем слаженно, чтобы воплотить в жизнь самые смелые
                        идеи.
                        Мы постоянно следим за трендами рекламной индустрии и внедряем новые технологии, чтобы быть на
                        шаг
                        впереди.
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <h1><span className={'under_line'}>Наш подход</span></h1>
                        <p>
                            <b>Анализ и планирование:</b> изучаем ваш бизнес, аудиторию и конкурентную среду. <br/>
                            <b>Идея и дизайн:</b> разрабатываем концепцию, в которой сочетаются эстетика,
                            функциональность и
                            узнаваемость. <br/>
                            <b>Производство:</b> используем проверенные материалы и современное оборудование,
                            обеспечивая
                            высокое
                            качество готового продукта. <br/>
                            <b>Монтаж и сервис:</b> берём на себя доставку, установку и дальнейшее обслуживание
                            рекламных
                            конструкций и декораций. <br/>
                        </p>
                        <p>
                            Мы гордимся тем, что помогаем брендам становиться заметнее и успешнее. Обращайтесь в MAS
                            market,
                            если хотите получить не просто рекламу, а работающие решения, которые сделают ваш бизнес
                            более
                            узнаваемым и прибыльным.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        {/*<img src={about_s1} alt=""/>*/}
                    </div>
                </div>
            </div>

            <div className="about-s3">
                <h1><span className={'under_line'}>Основные направления <br/> деятельности</span></h1>

                <div className="about-s3_content">
                    <div className="card-s3">
                        <div className="one">
                            <div className="music">
                                <img src={narujniy_reklama} alt=""/>
                            </div>
                            <span className="name">Наружная реклама</span>
                            <span className="name1">
                          вывески, билборды, световые короба, оформленные витрины и фасады.
                        </span>
                        </div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <div className="card-s3">
                        <div className="one">
                            <div className="music">
                                icon
                            </div>
                            <span className="name">Интерьерная реклама</span>
                            <span className="name1">
                                таблички, указатели, брендирование офисов, торговых залов и выставочных стендов.
                            </span>
                        </div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <div className="card-s3">
                        <div className="one">
                            <div className="music">
                                icon
                            </div>
                            <span className="name">Бизнес-сувениры</span>
                            <span className="name1">
                                разработка и производство оригинальной корпоративной продукции, которая помогает укреплять деловые связи и повышать узнаваемость бренда.
                            </span>
                        </div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <div className="card-s3">
                        <div className="one">
                            <div className="music">
                                icon
                            </div>
                            <span className="name">Оформление событий</span>
                            <span className="name1">
                                комплексная визуальная концепция для мероприятий, включая дизайн пространств, фотозон и тематических инсталляций.
                            </span>
                        </div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>

                </div>
            </div>

            <Question/>
        </div>
    );
};

export default About;