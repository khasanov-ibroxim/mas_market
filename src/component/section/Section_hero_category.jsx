import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import hc1 from "../../assets/img/hero_category/HDD.png";
import hc2 from "../../assets/img/hero_category/Cut.png";
import hc3 from "../../assets/img/hero_category/Flash_card.png";
import hc4 from "../../assets/img/hero_category/HDD-1.png";
import hc5 from "../../assets/img/hero_category/logo_xiaomi.png";
import hc6 from "../../assets/img/hero_category/Mobile.png";
import {$API} from "../../utils/http.jsx";
import {CATEGORY_PAGE} from "../../utils/const/consts.jsx";

const SectionHeroCategory = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    const getCategories = async () => {
        try {
            const response = await $API.get("/admin-api/category-list/");
            setCategories(response.data.results); // Assuming response contains the list of categories
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Function to navigate to CategoryPage with selected category id
    const handleCategoryClick = (categoryId) => {
        navigate(CATEGORY_PAGE.replace(`:categoryId`, categoryId));
    };

    return (
        <section className="section_hero_category">
            <h1>Основные категории</h1>
            <div className="section_hero_category_box">
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="section_hero_category_item"
                        onClick={() => handleCategoryClick(category.id)} // Navigate to the category page with the categoryId
                    >
                        <div className="section_hero_category_item_img">
                            <img src={category.imageUrl || hc1} alt={category.name} />
                        </div>
                        <div className="section_hero_category_item_text">
                            <p>{category.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SectionHeroCategory;
