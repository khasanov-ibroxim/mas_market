import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const ImageCarousel = ({ images }) => {
    console.log(images);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Return early if images array is empty or undefined
    if (!images || images.length === 0) {
        return <p>No images available</p>;
    }

    return (
        <div className="carousel-container">
            <div className="w-100">
                <button className="carousel-button-1" onClick={handlePrev}>
                    <FaChevronUp />
                </button>
                <div className="carousel-image">
                    <img src={images[currentIndex]?.file} alt={`Slide ${currentIndex}`} />
                </div>
                <button className="carousel-button-2" onClick={handleNext}>
                    <FaChevronDown />
                </button>
            </div>
        </div>
    );
};

export default ImageCarousel;
