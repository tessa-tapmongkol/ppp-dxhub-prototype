import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import { prod_data } from "../../constants/subcategoryitems";

function NamePage({ name, data }) {
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
        prod_data.filter((prod, i) => { return !similar.includes(i); });
        setSimilar([]);
    }

    return (
        <body>
            <Modal
                similar={similar}
                showModal={showModal}
                setShowModal={setShowModal}
                data={data}
            />
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{name}</h1>
            <div className="compareHeader">
                <h3>Select items that are similar</h3>
                <div>
                    <button className="differentCategoryButton" onClick={() => setShowModal(true)}>Add to different category</button>
                    <button className="compareButton" onClick={() => { removeProd(); }}>{"These " + similar.length + " items are similar"}</button>
                </div>
            </div>
            <div className="comparePage">
                <div className="compareCards">
                    {prod_data.map((prod, index) => { return getCards(prod, index); })}
                </div>
            </div>  
        </body>
    )
}

export default NamePage;