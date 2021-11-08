import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import axios from "axios";
import { styleSubcategory } from "../../constants/stringFunctions";
import { Oval } from 'react-loading-icons'

function ComparePage(props) {
    const [data, setData] = React.useState([]);
    const [similar, setSimilar] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const url = process.env.REACT_APP_API_URL + props.query.toLowerCase() + "&category=" + props.category;

    async function fetchAll() {
        try {
            return await axios.get(url, {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
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
                if (props.query === "Beef") parseTargetItems(result.data.stores.target.California["5659"]);
                else parseTargetItems(result.data.stores.target);
                parseWalmartItems(result.data.stores.walmart);
                parseNoonItems(result.data.stores.noon);
                parseUbuyItems(result.data.stores.ubuy);
                setLoading(false);
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
                key={prod.name + prod.link}
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
                brand: prod?.info?.primary_brand?.name,
                name: prod?.info?.product_description?.title,
                image: prod?.info?.enrichment?.images?.primary_image_url,
                price: prod?.pricing?.current_retail,
                desc: prod?.info?.product_description?.soft_bullets,
                link: prod?.info?.enrichment?.buy_url
            })
        }
        setData(oldData => [...oldData, ...targetItems]);
    }

    function parseWalmartItems(prods) {
        const walmartItems = [];
        for (const key in prods) {
            const prod = prods[key];
            const prodUrl = "https://www.walmart.com/" + prod?.info?.productUrl;
            walmartItems.push({
                store: "Walmart",
                brand: prod?.info?.name,
                name: prod?.info?.name,
                image: prod?.info?.image?.thumbnail,
                price: prod?.pricing?.displayPrice,
                desc: [""],
                link: prodUrl
            })
        }
        setData(oldData => [...oldData, ...walmartItems]);
    }

    function parseNoonItems(prods) {
        const noonItems = [];
        for (const key in prods) {
            const prod = prods[key];
            const prodUrl = "https://www.noon.com/uae-en/" + prod?.url + "/p?o=";
            const image = "https://z.nooncdn.com/products/tr:n-t_80/" + prod?.images?.image_keys[0] + ".jpg";
            noonItems.push({
                store: "Noon",
                brand: prod?.brand,
                name: prod?.name,
                image: image,
                price: prod?.pricing?.price,
                desc: [""],
                link: prodUrl
            })
        }
        setData(oldData => [...oldData, ...noonItems]);
    }

    function parseUbuyItems(prods) {
        const ubuyItems = [];
        for (const key in prods) {
            const prod = prods[key];
            ubuyItems.push({
                store: "Ubuy",
                brand: "",
                name: prod?.specifications,
                image: prod?.image,
                price: prod?.price,
                desc: [prod?.description],
                link: ""
            })
        }
        setData(oldData => [...oldData, ...ubuyItems]);
    }

    return (
        <body>
            <Link to={"/subcategories/" + props.category}><button className="subcategoryButton">Back to list of subcategories</button></Link>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{styleSubcategory(props.query)}</h1>
            <div className="compareHeader">
                <h3>Select items that are similar</h3>
                <button className="compareButton" onClick={() => { removeProd(); }}>{"These " + similar.length + " items are similar"}</button>
            </div>
            <div className="comparePage">
                <div className="compareCards">
                    {!loading ? data.map((targetProd, index) => { return getCards(targetProd, index); }) : <Oval fill="transparent" stroke="#06bcee" strokeOpacity={1} strokeWidth={2} />}
                </div>
            </div>
        </body>
    )
}

export default ComparePage;