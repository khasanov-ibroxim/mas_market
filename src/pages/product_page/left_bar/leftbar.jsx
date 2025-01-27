import { useState } from "react"
import { BACK, TOPIMG } from "../image"
import BottomBar from "./bottom-bar"

function Leftbar({info}) {
    const [akardion, setAkardion] = useState(true)

    return (
        <div className="product-details">
            <h2>{info.name}</h2>
            <div className="product-arct">
                <span>Арт. {info.articul}</span>
                <span>На складе {info.na_sklade} шт</span>
            </div>

            {info?.vid?.length > 0 && (
                <select className="form-select py-2" id="floatingSelect">
                    <option>Вид</option>
                    {info.vid.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            )}

            <div className="filter-top" id="floatingSelect">
                <div onClick={() => (setAkardion(!akardion))} className="down-top">
                    <span>Способ нанесения</span>
                    <img src={TOPIMG} alt="TOPIMG" />
                </div>
                <div className={`${akardion ? "filter-father" : "d-none"}`}>
                    {info?.sposib_naniseniya?.length > 0 ? info.sposib_naniseniya.map((item, index) => (
                        <div className="filter-child" key={index}>
                            <img src={BACK} alt=""/>
                            <span>{item}</span>
                        </div>
                    )) : ""}
                </div>
            </div>

            <BottomBar info={info}/>

            <p>Обратите внимание, что у каждого товара есть минимальное количество для добавления в корзину.</p>



        </div>
    )
}

export default Leftbar