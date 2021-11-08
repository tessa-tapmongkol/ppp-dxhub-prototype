import "./Card.css";
import React from "react";

function Card(props) {
    const [cardStyle, setCardStyle] = React.useState(true);

    return (
        <div className={cardStyle ? "card" : "similarCard"} onClick={() => {
            setCardStyle(!cardStyle);
            if (cardStyle === true) props.setSimilar(oldSimilar => [...oldSimilar, props.index]);
            else props.setSimilar(props.similar.filter(index => index !== props.index));
        }}>
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
                    {                    // eslint-disable-next-line react/jsx-no-target-blank
                    }                    <a href={props.link} target="_blank"><button class="linkButton">View on website</button></a>
                </tr>
            </table>
        </div>
    );
}

export default Card;