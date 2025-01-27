import React, {useEffect, useState} from 'react';
import './admin_product.css';
import {Dropdown, Space, Input, Upload, message, Button, Spin, Menu} from 'antd';
import {DownOutlined, InboxOutlined} from '@ant-design/icons';
import {$API, $authHost} from '../../../utils/http.jsx';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

const AdminProduct = () => {
    const [state, setState] = useState({
        selectedCategory: null,
        selectedSubCategory: null,
        infoUz: '',
        infoRu: '',
        productNameUz: '',
        productNameRu: '',
        productPrice: [
            {price_1:""},
        ],
        propertiesUz: '',
        propertiesRu: '',
        uploadedFiles: [],
        vid: [], // should be an array
        sposibNaniseniya: [], // should be an array
        oblast_naniseniya: [], // should be an array
        razmer: '',
        razmerType: 'mm',
        ves: '',
        vesType: 'gr',
        naSklade: '',
        articul: '',
        material: '',
        newKey: "",
    });
    console.log(state)
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({
        category: false,
        subCategory: false,
    });
    const [loading, setLoading] = useState(false);

    const toolbarOpt = ['blockquote', 'bold', 'italic', 'underline', 'strike', 'link'];
    const {Dragger} = Upload;

    // Kategoriyalarni olish
    const getCategory = async () => {
        try {
            const res = await $API.get('/admin-api/category-list/');
            setCategory(res.data.results);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    // Tanlangan kategoriya bo'yicha sub-kategoriyalarni olish
    const getSubCategory = async (categoryId) => {
        try {
            const res = await $API.get(`/admin-api/subcategory-by-category/${categoryId}/`);
            setSubCategory(res.data.results);
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            setState(prevState => ({
                ...prevState,
                uploadedFiles: [...prevState.uploadedFiles, file]
            }));
            return false; // Fayllarni avtomatik yuklashni to'xtatish
        },
        onRemove: (file) => {
            setState(prevState => ({
                ...prevState,
                uploadedFiles: prevState.uploadedFiles.filter(f => f.uid !== file.uid)
            }));
        },
    };

    // Kategoriyani tanlaganda sub-kategoriyalarni yangilash
    const handleCategorySelect = (category) => {
        setState(prevState => ({
            ...prevState,
            selectedCategory: category
        }));
        setDropdownVisible(prevState => ({
            ...prevState,
            category: false, // Tanlangandan keyin dropdownni yopish
        }));
        getSubCategory(category.id);
    };


    const handleSubCategorySelect = (subCategory) => {
        setState(prevState => ({
            ...prevState,
            selectedSubCategory: subCategory
        }));
        setDropdownVisible(prevState => ({
            ...prevState,
            subCategory: false,
        }));
    };


    const categoryMenu = (
        <Menu>
            {category.map((cat) => (
                <Menu.Item key={cat.id} onClick={() => handleCategorySelect(cat)}>
                    {cat.name}
                </Menu.Item>
            ))}
        </Menu>
    );

    const subCategoryMenu = (
        <Menu>
            {subCategory.map((sub) => (
                <Menu.Item key={sub.id} onClick={() => handleSubCategorySelect(sub)}>
                    {sub.name}
                </Menu.Item>
            ))}
        </Menu>
    );

    const postProduct = async () => {
        if (!state.productNameUz || !state.productNameRu || !state.selectedCategory || !state.productPrice) {
            message.error('Barcha maydonlarni to\'ldiring!');
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            // 1. Fayllarni alohida yuklash
            const uploadedMediaIds = [];
            for (let file of state.uploadedFiles) {
                const mediaFormData = new FormData();
                mediaFormData.append('product_name', state.productNameUz); // yoki boshqa nom
                mediaFormData.append('file', file);

                const mediaRes = await $authHost.post('/admin-api/media-create/', mediaFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(mediaRes);
                uploadedMediaIds.push(mediaRes.data.id); // yuklangan fayl id sini saqlash
            }
            console.log(uploadedMediaIds);

            // 2. Mahsulot yaratish
            const formData = new FormData();
            formData.append('name', state.productNameUz);
            formData.append('nameRU', state.productNameRu);
            formData.append('category', state.selectedCategory.id);
            formData.append('subcategory', state.selectedSubCategory.id);
            formData.append('price', JSON.stringify(state.productPrice));
            formData.append('infoUZ', state.infoUz);
            formData.append('infoRU', state.infoRu);
            formData.append('propertiesUz', state.propertiesUz);
            formData.append('propertiesRU', state.propertiesRu);

            // Convert arrays to JSON strings
            formData.append('vid', JSON.stringify(state.vid)); // Convert to JSON
            formData.append('sposib_naniseniya', JSON.stringify(state.sposibNaniseniya)); // Convert to JSON
            formData.append('oblast_naniseniya', JSON.stringify(state.oblast_naniseniya)); // Convert to JSON

            formData.append('razmer', JSON.stringify({Razmer: state.razmer, Razmer_type: state.razmerType}));
            formData.append('ves', JSON.stringify({Ves: state.ves, Ves_type: state.vesType}));
            formData.append('na_sklade', state.naSklade);
            formData.append('articul', state.articul);
            formData.append('material', state.material);

            uploadedMediaIds.forEach(id => {
                formData.append('photos_or_videos', id); // media id larni qo'shish
            });

            const res = await $authHost.post('/admin-api/product-create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res)
            message.success('Mahsulot muvaffaqiyatli yaratildi!');
        } catch (e) {
            console.log(e);
            message.error('Mahsulotni yaratishda xatolik yuz berdi!');
        } finally {
            setLoading(false);
        }
    };

    const handlePriceChange = (index, key, value) => {
        setState(prevState => {
            const updatedProductPrice = [...prevState.productPrice];
            updatedProductPrice[index] = {
                ...updatedProductPrice[index],
                [key]: value,
            };
            return {
                ...prevState,
                productPrice: updatedProductPrice,
            };
        });
    };
    // Handle input change for the new key name
    const handleNewKeyChange = (e) => {
        setState(prevState => ({
            ...prevState,
            newKey: e.target.value,
        }));
    };

    // Add a new price object with the user-defined key
    const addNewPrice = () => {
        if (state.newKey.trim() === "") {
            alert("Please provide a valid key name.");
            return;
        }

        setState(prevState => {
            const newPriceObject = {
                [state.newKey]: "",  // Use the custom key provided by the user
            };
            return {
                ...prevState,
                productPrice: [...prevState.productPrice, newPriceObject],
                newKey: "", // Clear the input field after adding
            };
        });
    };

    return (
        <div className="admin-product">
            <div className="category_product">
                <h1>Создание товара</h1>

                <label>Категория товара *</label>
                <Dropdown
                    className={'category_product_item'}
                    trigger={["click"]}
                    visible={dropdownVisible.category}
                    onVisibleChange={(flag) =>
                        setDropdownVisible(prevState => ({...prevState, category: flag}))
                    }
                    overlay={categoryMenu}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        {state.selectedCategory ? state.selectedCategory.name : 'Выбрать категорию'} <DownOutlined/>
                    </a>
                </Dropdown>


                {state.selectedCategory && (
                    <div style={{marginTop: "15px"}}>
                        <label>Подкатегория товара *</label>
                        <Dropdown
                            className={"category_product_item"}
                            trigger={["click"]}
                            visible={dropdownVisible.subCategory}
                            onVisibleChange={(flag) => setDropdownVisible(prevState => ({
                                ...prevState,
                                subCategory: flag
                            }))}
                            overlay={subCategoryMenu}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                {state.selectedSubCategory ? state.selectedSubCategory.name : 'Выбрать подкатегорию'}
                                <DownOutlined/>
                            </a>
                        </Dropdown>
                    </div>
                )}
            </div>

            <div className="product_content_name">
                <label>Название товара на Узбекском *</label>
                <Input maxLength={90} value={state.productNameUz}
                       onChange={(e) => setState(prevState => ({...prevState, productNameUz: e.target.value}))}
                       placeholder="Точное название товара" className="product_input" disabled={loading}/>

                <label>Название товара на Русском *</label>
                <Input maxLength={90} value={state.productNameRu}
                       onChange={(e) => setState(prevState => ({...prevState, productNameRu: e.target.value}))}
                       placeholder="Точное название товара" className="product_input" disabled={loading}/>
            </div>

            <div className="product_content_price">
                {/* Input to specify the new key name */}
                <Input
                    value={state.newKey}
                    onChange={handleNewKeyChange}
                    placeholder="Enter new key name"
                    className="product_input"
                />
                <Button type={"primary"} onClick={addNewPrice}>Add New Price</Button>

                {/* Render the price objects */}
                {state.productPrice.map((item, index) => (
                    <div key={index}>

                        {Object.keys(item).map((key) => (
                            <div key={key} className="product_price_item">
                                <label>{key}</label>
                                <Input
                                    key={key}
                                    maxLength={90}
                                    value={item[key]} // Display the value of the current price key
                                    onChange={(e) => handlePriceChange(index, key, e.target.value)}
                                    placeholder={`Цена товара ${key}`}
                                    className="product_input"
                                    disabled={state.loading}
                                />
                            </div>

                        ))}
                    </div>
                ))}
            </div>

            <div className="product_content_info">
                <label>Описание товара на Узбекском *</label>
                <ReactQuill theme="snow"
                            modules={{toolbar: toolbarOpt}}
                            value={state.infoUz}
                            onChange={(value) => setState(prevState => ({...prevState, infoUz: value}))}
                            className={"product_content_info_item"} readOnly={loading}/>
                <label>Описание товара на Русском *</label>
                <ReactQuill theme="snow"
                            modules={{toolbar: toolbarOpt}}
                            value={state.infoRu}
                            onChange={(value) => setState(prevState => ({...prevState, infoRu: value}))}
                            className={"product_content_info_item"} readOnly={loading}/>
            </div>

            <div className="product_content_properties">
                <div className="properties">
                    <label>свойства товара на Узбекском *</label>
                    <Input maxLength={90} value={state.propertiesUz}
                           onChange={(e) => setState(prevState => ({...prevState, propertiesUz: e.target.value}))}
                           placeholder="свойства товара" className="product_input" disabled={loading}/>
                </div>

                <div className="properties">
                    <label>свойства товара на Русском *</label>
                    <Input maxLength={90} value={state.propertiesRu}
                           onChange={(e) => setState(prevState => ({...prevState, propertiesRu: e.target.value}))}
                           placeholder="свойства товара" className="product_input properties" disabled={loading}/>
                </div>
            </div>

            <div className="product_content_properties">


                <div className="properties">
                    <label>Sposib Naniseniya</label>
                    <Input
                        value={state.sposibNaniseniya.join(', ')} // Show as comma-separated string
                        onChange={(e) => setState(prevState => ({
                            ...prevState,
                            sposibNaniseniya: e.target.value.split(',').map(item => item.trim())
                        }))} // Split string into array
                    />
                </div>
                <div className="properties">
                    <label>oblast Naniseniya</label>
                    <Input
                        value={state.oblast_naniseniya.join(', ')} // Show as comma-separated string
                        onChange={(e) => setState(prevState => ({
                            ...prevState,
                            oblast_naniseniya: e.target.value.split(',').map(item => item.trim())
                        }))} // Split string into array
                    />
                </div>
            </div>

            <div className="product_content_properties">
                <div className="properties">
                    <div>
                        <p> Razmer:</p>
                        <label style={{display: "flex"}}>

                            <input
                                type="text"
                                value={state.razmer}
                                onChange={(e) => setState(prevState => ({...prevState, razmer: e.target.value}))}
                                placeholder="Razmer kiriting"
                            />
                            <select value={state.razmerType}
                                    onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        razmerType: e.target.value
                                    }))}>
                                <option value="mm">mm</option>
                                <option value="sm">sm</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="properties">
                    <div>
                        <p> Ves:</p>
                        <label style={{display: "flex"}}>

                            <input
                                type="number"
                                value={state.ves}
                                onChange={(e) => setState(prevState => ({...prevState, ves: e.target.value}))}
                                placeholder="Ves kiriting"
                            />
                            <select value={state.vesType}
                                    onChange={(e) => setState(prevState => ({...prevState, vesType: e.target.value}))}>
                                <option value="gr">gr</option>
                                <option value="kg">kg</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>


            <div className="product_content_properties">
                <div className="properties">
                    <label>Na Sklade</label>
                    <Input value={state.naSklade}
                           type={"number"}
                           onChange={(e) => setState(prevState => ({...prevState, naSklade: e.target.value}))}/>

                </div>

                <div className="properties">
                    <label>Articul</label>
                    <Input value={state.articul}
                           onChange={(e) => setState(prevState => ({...prevState, articul: e.target.value}))}/>

                </div>
            </div>

            <div className="product_content_properties">
                <div className="properties">
                    <label>Material</label>
                    <Input value={state.material}
                           onChange={(e) => setState(prevState => ({...prevState, material: e.target.value}))}/>

                </div>
                <div className="properties">
                    <label>VID</label>
                    <Input
                        value={state.vid.join(', ')} // Show as comma-separated string
                        onChange={(e) => setState(prevState => ({
                            ...prevState,
                            vid: e.target.value.split(',').map(item => item.trim())
                        }))} // Split string into array
                    />
                </div>

            </div>


            <div className="product_photo_content">
                <Spin spinning={loading}>
                    <Dragger {...props} disabled={loading}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Выберите файл или перетащите сюда</p>
                        <p className="ant-upload-hint">
                            Поддерживает расширения .jpg, .jpeg, .png, .webp, .svg
                        </p>
                    </Dragger>
                </Spin>
            </div>

            <div className="save_product_btn">
                <Button type="primary" onClick={postProduct} disabled={loading}>Создать</Button>
            </div>
        </div>
    );
};

export default AdminProduct;
