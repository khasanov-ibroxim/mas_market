import React, { useState, useEffect } from 'react';
import './bottom.css'

export default function CoruselBottom({info}) {
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        // Retrieve saved tab from localStorage on component mount
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab); // Save active tab to localStorage
    };

    return (
        <div className="container">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => handleTabClick('description')}
                >
                    Описание
                </button>
            </div>

            <div className="content">
                {activeTab === 'description' && (
                    <div className="description">
                        <div dangerouslySetInnerHTML={{__html: info.infoRU}}/>
                        <div className="details">
                            <div>
                                <strong>Размеры:</strong>
                                <span>{info?.razmer?.Razmer}{info?.razmer?.Razmer_type}</span>
                            </div>
                            <div>
                                <strong>Материал:</strong>
                                <span>{info.material}</span>
                            </div>
                            <div>
                                <strong>Область нанесения:</strong>
                                <span>{info.oblast_naniseniya}</span>
                            </div>
                            <div>
                                <strong>Вес:</strong>
                                <span>{info?.ves?.Ves}{info?.ves?.Ves_type}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


