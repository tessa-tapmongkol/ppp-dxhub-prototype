import "./Card.css";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card(props) {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                 <div className="card"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                 >
                 <table className="cardContent">
                     <tr>
                         {
                             props.image ? <img className="cardImage" src={props.image} alt="img" /> : <img className="cardImage" src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" alt="img" />
                         }
                     </tr>
                     <tr className="cardInfo">
                         <h3>{props.store}</h3>
                         <p>{props.brand ? "Brand: " + props.brand : "Unknown"}</p>
                         <p>{props.name ? "Name: " + props.name : "Unknown"}</p>
                         <p>{props.price ? "Price: $" + props.price : "Unknown"}</p>
                         <h4>Description</h4>
                         {
                             props.desc ? Object.values(props.desc).map(bullet => {
                                 return <p>{bullet}</p>
                             }) : ""
                         }
                         {// eslint-disable-next-line react/jsx-no-target-blank
                         }<a href={props.link} target="_blank"><button className="linkButton">View on website</button></a>
                     </tr>
                 </table>
             </div>
            )}
        </Draggable>
    );
}

export default Card;