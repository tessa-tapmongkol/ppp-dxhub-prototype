import React from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai';
import SortCard from "../SortCard/SortCard";
import { prod_data } from "../../constants/dummyProductData";

const Modal = ({ similar, showModal, setShowModal, data }) => {
    const [list, setList] = React.useState(data); // list of categories displayed in modal
    const [showAddButton, setShowAddButton] = React.useState(false); // determines when "Add" button should be displayed
    const [path, setPath] = React.useState([data]); // keeps track of categories user clicks on

    // updates list of categories displayed to the user
    const updateList = (element) => {
        setShowAddButton(false);
        if (element.hasOwnProperty('groups')) {
            setList(element.groups);
        } else if (element.hasOwnProperty('classes')) {
            setList(element.classes);
        } else if (element.hasOwnProperty('headings')) {
            setList(element.headings);
        } else if (element.hasOwnProperty('names')) {
            setList(element.names);
            setShowAddButton(true);
        }
    }

    // updates the path the user has taken
    const updatePath = (element) => {
        setPath([...path, element]);
    }

    // when user clicks on a part of the path, update the list of categories displayed to the user
    const onClickPath = (element, index) => {
        if (index === path.length - 1) return;
        const new_path = [];
        for(var i = 0; i < index; i++) {
            new_path.push(path[i]);
        }
        setPath(new_path);
        updateList(element);
    }

    // updates string of products displayed at top of modal
    const getSimilarString = () => {
        var result = "";
        const similarProd = prod_data.filter((prod, i) => { return similar.includes(i); })
        similarProd.forEach(product => result += "\"" + product.name + "\" ")
        return result;
    }

    return (
        <ReactModal isOpen={showModal} className="sortModal">
            <div>
                <div style={{ textAlign: "right" }}>
                    <AiOutlineClose onClick={() => setShowModal(false)} className="exitModalButton" />
                </div>
                <h1>{"Add " + getSimilarString() + " to"}</h1>
                <div style={{ backgroundColor: "white", width: "fit-content", padding: "5px", borderRadius: "5px" }}>
                    {path.map((element, index) => {
                        if (index === 0) {
                            return <p className="pathString" style={{ display: "inline", cursor: "pointer" }} onClick={() => {
                                setList(data);
                                setPath([data]);
                                setShowAddButton(false);
                            }}>Categories</p>
                        } else {
                            return (
                                <div style={{ display: "inline" }}>
                                    <p style={{ display: "inline" }}>{" > "}</p>
                                    <p className="pathString" style={{ display: "inline", cursor: "pointer" }} onClick={() => onClickPath(element, index)}>{element.name}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="sortNameCards">
                    {list !== undefined && list !== null ? list.map(listElement => {
                        return (
                            <SortCard element={listElement} updateList={updateList} updatePath={updatePath} />
                        )
                    }) : null}
                </div>
            </div>
            {showAddButton === true ? (
                <button className="searchButton">Add</button>
            ) : null}
        </ReactModal>
    );
}

export default Modal;