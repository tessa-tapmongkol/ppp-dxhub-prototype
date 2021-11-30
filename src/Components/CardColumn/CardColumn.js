import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "../Card/Card";
import Tile from "../Tile/Tile";

const Container = styled.div`
    width: 23.5rem;
    min-height: 65vh;
    height: fit-content;
    background-color: ${props => (props.isDraggingOver ? '#bee7be' : 'white')};
    border-radius: 6px;
`

const CardCol = styled.div`
    padding: 0 10px;
    border: 0.1px solid black;
    margin-right: 10px;
    border-radius: 6px;
`

export default function CardColumn(props) {
    return (
        <CardCol>
            <h3>{props.title + " (" + props.cards.length + ")"}</h3>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                            {props.cards !== null ? props.cards.map((prod, index) => {
                                return (
                                    props.id === 'column-1' ? (
                                        <Card
                                            store={prod.store}
                                            brand={prod.brand}
                                            name={prod.name}
                                            image={prod.image}
                                            price={prod.price}
                                            desc={prod.desc}
                                            link={prod.link}
                                            key={prod.name + prod.link}
                                            index={index}
                                            id={prod.name + prod.link}
                                        />
                                    ) : (
                                        <Tile
                                            name={prod.name}
                                            image={prod.image}
                                            key={prod.name + prod.link}
                                            index={index}
                                            id={prod.name + prod.link}
                                        />
                                        )
                                    ) 
                            }): null}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </CardCol>
    );
}