import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import axios from "axios";
import PokemonTemplate from "./PokemonTemplate";
import { Spinner } from "reactstrap";


const PokemonCards = () => {
    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(function loadCards() {
        async function requestCards() {
            try {
                const res = await axios.get("/api/pokemon/cards");
                setCards(res.data);
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
                    <h1 className="mb-5"><strong>Pokemon</strong></h1>
                    <div className="row">
                        {cards.map((c) => (
                            <div key={uuid()} className="col-12 col-md-6 col-xl-4 col-xxl-3">
                                <PokemonTemplate
                                    id={c.id}
                                    name={c.name}
                                    image={c.image}
                                    flavor_text={c.flavor_text}
                                    rarity={c.rarity || "N/A"}
                                    hp={c.hp}
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
    );
}

// Pagination starter code for later
// <nav className="my-4" aria-label="...">
//     <ul className="pagination pagination-circle justify-content-center">
//         <li className="page-item">
//             <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
//         </li>
//         <li className="page-item"><a className="page-link" href="#">1</a></li>
//         <li className="page-item active" aria-current="page">
//             <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
//         </li>
//         <li className="page-item"><a className="page-link" href="#">3</a></li>
//         <li className="page-item">
//             <a className="page-link" href="#">Next</a>
//         </li>
//     </ul>
// </nav>

export default PokemonCards;