import React from "react";

const SortCard = ({ element, updateList, updatePath }) => {
    return (
        <div className="modalTile" onClick={() => {
            updateList(element);
            updatePath(element)
        }
        }>
            <p style={{ textAlign: "left", padding: "10px"}}>{element.name}</p>
        </div>
    )
};

export default SortCard;