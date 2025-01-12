import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import axios from "axios";
import YugiohTemplate from "./YugiohTemplate";
import { Spinner } from "reactstrap";


const YugiohCards = () => {
    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(function loadCards() {
        async function requestCards() {
            try {
                const res = await axios.get("/api/yugioh/cards");
                setCards(res.data.cards);
                setIsLoaded(!isLoaded);
            } catch (error) {
                console.error(error);
            }
        }
        requestCards();
    }, [])

    return (
        <>
            {isLoaded ? (
                <div className="container-fluid text-center">
                    <h1 className="mb-5"><strong>Yugioh</strong></h1>
                    <div className="row">
                        {cards.map((c) => (
                            <div key={uuid()} className="col-12 col-md-6 col-xl-4 col-xxl-3">
                                <YugiohTemplate
                                    id={c.id}
                                    name={c.name}
                                    image={`https://capstone2-yugioh-images.s3.us-east-1.amazonaws.com/Yugioh_Images/${c.id}.jpg`}
                                    type={c.type || "N/A"}
                                    race={c.race || "N/A"}
                                    attack={c.attack || "N/A"}
                                    defense={c.defense || "N/A"}
                                    price={`$${c.price}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    )
}

export default YugiohCards;