import "./product_page.css";
import { ImageOne } from './image';
import Leftbar from './left_bar/leftbar';
import CoruselBottom from './corusel_bottom/corusel-bottom';
import ImageCarousel from './corusel_bottom/image-carousel ';
import CoruselMobile from "./corusel_bottom/corusel-mobile";
import {$API} from "../../utils/http.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import photoOrVideo from "../../assets/img/login_truck.png"
const ProductPage = () => {
    const [product, setProduct] = useState({});
    const {productId} = useParams()


    const getProductById = async () =>{
        try {
            const res = await $API.get(`/api/product-by-id/${productId}/`)
            setProduct(res.data)
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getProductById()
    }, []);
    return (
        <div className="product-container">
            <div className='d-flex flex-column justify-content-start gap-5 product-father'>
                <div className="slider-container">

                    <img className="imageSLider" src={product.photos_or_videos && product.photos_or_videos.length > 0
                        ? product.photos_or_videos[0].file
                        : photoOrVideo}  alt="imageSLider" />

                    <div style={{ maxWidth: "350px" }} className="mobile-flex-hidden">
                        <CoruselMobile images={product.photos_or_videos}/>
                    </div>

                    <div className="slider">
                        <ImageCarousel images={product.photos_or_videos} />
                    </div>

                </div>
                <CoruselBottom info={product}/>
            </div>
            
            <div>
                <Leftbar  info={product}/>
            </div>
        </div>
    );
};

export default ProductPage;
