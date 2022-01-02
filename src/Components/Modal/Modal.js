import React from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai';
import SortCard from "../SortCard/SortCard";
import { prod_data } from "../../constants/subcategoryitems";

const Modal = ({ similar, showModal, setShowModal, data }) => {
    const [list, setList] = React.useState(data);
    const [path, setPath] = React.useState("Categories");
    const [showAddButton, setShowAddButton] = React.useState(false);

    const updateList = (element) => {
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

    const updatePath = (element) => {
        const new_path = path + " > " + element.name;
        setPath(new_path);
    }

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
                <p>{path}</p>
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