import React from 'react';
import arrowRight from "../../assets/icons/arrowRight.svg"
import newsIcon from "../../assets/icons/newsIcon.svg"

const Ostavaytes = () => {
    const items = [
        {
            title: "Маски теперь в продаже",
            description: `Принимая во внимание показатели успешности,
             синтетическое тестирование способствует повышению
             качества анализа существующих паттернов поведения. Противоположная точка зрения подразумевает.`,
            date: "20.10.2024"
        },
        {
            title: "Маски теперь в продаже",
            description: `Принимая во внимание показатели успешности,
             синтетическое тестирование способствует повышению
             качества анализа существующих паттернов поведения. Противоположная точка зрения подразумевает.`,
            date: "20.10.2024"
        },
    ]
    return (
        <section className="ostavaytes">
            <div className="ostavaytes_title">
                <h1>Оставайтесь <span className={'under_line'}>в курсе событий</span></h1>
            </div>

            <div className="ostavaytes_box">
                {items.map((item, index) => (
                    <div key={index} className="ostavaytes_item">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <span>
                        <h3>{item.date}</h3>
                            <img src={arrowRight} alt=""/>
                        </span>
                    </div>
                ))}
            </div>
            <button>Все новости <img src={newsIcon} alt=""/></button>
        </section>
    );
};

export default Ostavaytes;