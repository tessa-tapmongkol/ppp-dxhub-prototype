import React from "react";

const SortCard = ({ sub }) => {
    const [selectCard, setSelectCard] = React.useState(false);

    return (
        <div onClick={() => setSelectCard(!selectCard)} className={selectCard ? "selectedSortNameCard" : "sortNameCard"}>
            <h3 className="sortName">{sub}</h3>
        </div>
    )
};

export default SortCard;