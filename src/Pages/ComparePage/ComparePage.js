import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import axios from "axios";
import { styleSubcategory } from "../../constants/stringFunctions";

function ComparePage(props) {
    const [data, setData] = React.useState([]);
    const [similar, setSimilar] = React.useState([]);

    const url = "https://5e7hnb1vb3.execute-api.us-west-2.amazonaws.com/dev/product-data?query=" + props.query.toLowerCase() + "&category=" + props.category;

    async function fetchAll() {
        try {
            return await axios.get(url, {
                headers: {
                    'x-api-key': '',
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    React.useEffect(() => {
        fetchAll().then(result => {
            if (result && result !== undefined) {
                parseTargetItems(result.data.stores.target);
                parseWalmartItems(result.data.stores.walmart);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function removeProd() {
        setData(data.filter((prod, i) => { return !similar.includes(i); }));
        setSimilar([]);
    }

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
                key={prod.name}
                similar={similar}
                setSimilar={setSimilar}
                index={index}
            />
        );
    }

    function parseTargetItems(prods) {
        const targetItems = [];
        for (const key in prods) {
            const prod = prods[key];
            targetItems.push({
                store: "Target",
                brand: prod.info.primary_brand.name,
                name: prod.info.product_description.title,
                image: prod.info.enrichment.images.primary_image_url,
                price: prod.pricing.current_retail,
                desc: prod.info.product_description.soft_bullets,
                link: prod.info.enrichment.buy_url
            })
        }
        setData(oldData => [...oldData, ...targetItems]);
    }

    function parseWalmartItems(prods) {
        const walmartItems = [];
        for (const key in prods) {
            const prod = prods[key];
            const prodUrl = "https://www.walmart.com/" + prod.info.productUrl
            walmartItems.push({
                store: "Walmart",
                brand: prod.info.name,
                name: prod.info.name,
                image: prod.info.image.thumbnail,
                price: prod.pricing.displayPrice,
                desc: [""],
                link: prodUrl
            })
        }
        setData(oldData => [...oldData, ...walmartItems]);
    }

    console.log(similar);

    return (
        <body>
            <Link to={"/subcategories/" + props.category}><button className="subcategoryButton">Back to subcategories</button></Link>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <h1>{styleSubcategory(props.query)}</h1>
            <div className="compareHeader">
                <h3>Select items that are similar</h3>
                <button className="compareButton" onClick={() => { removeProd(); }}>These selected items are similar</button>
            </div>
            <div className="comparePage">
                <div className="compareCards">
                    {data.map((targetProd, index) => { return getCards(targetProd, index); })}
                </div>
            </div>
        </body>
    )
}

export default ComparePage;