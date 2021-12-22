import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { styleSubcategory } from "../../constants/stringFunctions";
import ReactModal from "react-modal";
import { sort_subcategory } from "../../constants/subcategoryitems";
import { AiOutlineClose } from 'react-icons/ai';
import { data } from "../../constants/subcategoryitems";
import SortCard from "../../Components/SortCard/SortCard";

function ComparePage(props) {
    const [similar, setSimilar] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    function getCards(prod, index) {
        return (
            <Card
                store={prod.store}
                brand={prod.brand}
                name={prod.name}
                image={prod.image}
                price={prod.price}
                desc={prod.desc}
                link={prod.link}
                key={prod.name + prod.link}
                similar={similar}
                setSimilar={setSimilar}
                index={index}
            />
        );
    }

    function removeProd() {
        data.filter((prod, i) => { return !similar.includes(i); });
        setSimilar([]);
    }

    function getSimilarString() {
        var result = "";
        const similarProd = data.filter((prod, i) => { return similar.includes(i); })
        similarProd.forEach(product => result += "\"" + product.name + "\" ")
        return result;
    }

    return (
        <body>
            <ReactModal isOpen={showModal} className="sortModal">
                <div>
                    <div style={{ textAlign: "right" }}>
                        <AiOutlineClose onClick={() => setShowModal(false)} className="exitModalButton" />
                    </div>
                    <h1>{"Add " + getSimilarString() + " to"}</h1>
                    <div className="sortNameCards">
                        {sort_subcategory.map(sub => {
                            return (
                                <SortCard sub={sub} />
                            )
                        })}
                    </div>
                </div>
            </ReactModal>
            <Link to={"/subcategories/" + props.category}><button className="subcategoryButton">Back to list of subcategories</button></Link>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{styleSubcategory(props.query)}</h1>
            <div className="compareHeader">
                <h3>Select items that are similar</h3>
                <div>
                    <button className="differentCategoryButton" onClick={() => setShowModal(true)}>Add to different category</button>
                    <button className="compareButton" onClick={() => { removeProd(); }}>{"These " + similar.length + " items are similar"}</button>
                </div>
            </div>
            <div className="comparePage">
                <div className="compareCards">
                    {data.map((prod, index) => { return getCards(prod, index); })}
                </div>
            </div>  
        </body>
    )
}

export default ComparePage;