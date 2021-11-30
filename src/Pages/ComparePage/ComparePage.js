import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styleSubcategory } from "../../constants/stringFunctions";
import { Oval } from 'react-loading-icons';
import { DragDropContext } from "react-beautiful-dnd";
import CardColumn from "../../Components/CardColumn/CardColumn";

function ComparePage(props) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'All items',
                data: []
            },
            'column-2': {
                id: 'column-2',
                title: 'Category One',
                data: []
            },
            'column-3': {
                id: 'column-3',
                title: 'Category Two',
                data: []
            },
            'column-4': {
                id: 'column-4',
                title: 'Category Three',
                data: []
            }
        },
        columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
    })

    const url = process.env.REACT_APP_API_URL + props.query.toLowerCase() + "&category=" + props.category;

    async function fetchAll() {
        try {
            return await axios.get(url, {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
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
        const newData = data;
        newData.columns['column-1'].data.push(...targetItems);
        setData(newData);
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
        const newData = data;
        newData.columns['column-1'].data.push(...walmartItems);
        setData(newData);
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
        const newData = data;
        newData.columns['column-1'].data.push(...noonItems);
        setData(newData);
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
        const newData = data;
        newData.columns['column-1'].data.push(...ubuyItems);
        setData(newData);
    }

    function onDragEnd(result) {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        const start = data.columns[source.droppableId];
        const end = data.columns[destination.droppableId];
        if (start === end) {
            const newData = Array.from(start.data);
            const [reordered] = newData.splice(source.index, 1);
            newData.splice(destination.index, 0, reordered);
            const newColumn = {
                ...start,
                data: newData
            };
            const newSameColumnData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }
            setData(newSameColumnData);
            return;
        }
        const newStartData = Array.from(start.data);
        const [reorderedCol] = newStartData.splice(source.index, 1);
        const newStart = {
            ...start,
            data: newStartData
        };

        const newEndData = Array.from(end.data);
        newEndData.splice(destination.index, 0, reorderedCol);
        const newEnd = {
            ...end,
            data: newEndData
        };
        const newColumnData = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newEnd.id]: newEnd
            }
        }
        setData(newColumnData);
    }

    function onClickSubmit() {
        const newColumnData = {
            ...data,
            columns: {
                ...data.columns
            }
        }
        data.columnOrder.forEach((columnId) => {
            if (columnId !== 'column-1') {
                const newCol = {
                    ...data.columns[columnId],
                    data: []
                }
                newColumnData.columns[columnId] = newCol;
            }
        });
        setData(newColumnData);
    }

    return (
        <body>
            <Link to={"/subcategories/" + props.category}><button className="subcategoryButton">Back to list of subcategories</button></Link>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <div className="subcategoryHeader">
                <h1>{styleSubcategory(props.query)}</h1>
                <button className="searchButton" onClick={onClickSubmit}>Submit</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="comparePage">
                    {!loading ? (
                        <div className="cardColumns">
                            <CardColumn
                                title={data.columns['column-1'].title}
                                id={data.columns['column-1'].id}
                                cards={data.columns['column-1'].data}
                            />
                            <div class="wrapper1">
                                <div class="div1">
                                </div>
                            </div>
                            <div class="wrapper2">
                                <div className="categoryColumns">
                                    {data.columnOrder.map(columnId => {
                                        const column = data.columns[columnId];
                                        return columnId !== 'column-1' ?
                                            (
                                                <CardColumn
                                                    title={column.title}
                                                    id={column.id}
                                                    cards={column.data}
                                                />
                                            ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : <Oval fill="transparent" stroke="#06bcee" strokeOpacity={1} strokeWidth={2} />}
                </div>
            </DragDropContext>
        </body>
    )
}

export default ComparePage;