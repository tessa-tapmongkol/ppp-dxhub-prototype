import "./Tile.css";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Tile(props) {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                 <div className="tile"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                 >
                 <table className="tileContent">
                     <tr>
                         <td>
                            {props.image ? <img className="tileImage" src={props.image} alt="img" /> : <img className="cardImage" src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" alt="img" />}
                        </td>
                        <td>
                            <p>{props.name ? props.name : "Unknown"}</p>
                        </td>
                     </tr>
                 </table>
             </div>
            )}
        </Draggable>
    );
}

export default Tile;