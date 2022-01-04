import "./Card.css";
import React from "react";

const Card = ({ setSimilar, similar, index, image, store, brand, name, price, desc, link }) => {
    const [selectedCard, setSelectedCard] = React.useState(true); // if user has clicked on card

    return (
        <div className={selectedCard ? "card" : "similarCard"} onClick={() => {
            // when user clicks on card -> red highlight style appears on card and index of card gets added to similar array
            setSelectedCard(!selectedCard);
            if (selectedCard === true) setSimilar(oldSimilar => [...oldSimilar, index]);
            else setSimilar(similar.filter(i => i !== index));
        }}>
            <table className="cardContent">
                <tr>
                    {
                        image ? <img className="cardImage" src={image} alt="img" /> : <img className="cardImage" src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" alt="img" />
                    }
                </tr>
                <tr className="cardInfo">
                    <h3>{store}</h3>
                    <p>{brand ? "Brand: " + brand : "Unknown"}</p>
                    <p>{name ? "Name: " + name : "Unknown"}</p>
                    <p>{price ? "Price: $" + price : "Unknown"}</p>
                    <h4>Description</h4>
                    {
                        desc ? Object.values(desc).map(bullet => {
                            return <p>{bullet}</p>
                        }) : ""
                    }
                    {                    // eslint-disable-next-line react/jsx-no-target-blank
                    }                    <a href={link} target="_blank"><button class="linkButton">View on website</button></a>
                </tr>
            </table>
        </div>
    );
}

export default Card;