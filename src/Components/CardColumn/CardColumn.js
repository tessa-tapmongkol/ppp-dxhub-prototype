import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "../Card/Card";

const Container = styled.div`
    width: 23rem;
    height: 100%;
    background-color: ${props => (props.isDraggingOver ? '#8FBC8F' : 'white')};
`

export default function CardColumn(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                            {props.cards !== null ? props.cards.map((prod, index) => {
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
                                        index={index}
                                        id={prod.name + prod.link}
                                    />
                                )
                            }): null}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </div>
    );
}