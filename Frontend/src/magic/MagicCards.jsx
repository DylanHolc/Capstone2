import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import axios from "axios";
import MagicTemplate from "./MagicTemplate";
import Pagination from "../Pagination";
import { Spinner } from "reactstrap";


const MagicCards = () => {

    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);

    useEffect(function loadCards() {
        async function requestCards() {
            try {
                const res = await axios.get("/api/mtg/cards");
                setCards(res.data.cards);
                setIsLoaded(!isLoaded);
            } catch (error) {
                console.error(error);
            }
        }
        requestCards();
    }, [])

    const idxOfLastCard = currentPage * postsPerPage;
    const idxOfFirstCard = idxOfLastCard - postsPerPage;
    const currentCards = cards.slice(idxOfFirstCard, idxOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {isLoaded ? (
                <div className="container-fluid text-center">
                    <h1 className="mb-5"><strong>Magic The Gathering</strong></h1>
                    <div className="row">
                        {currentCards.map((c) => (
                            <div key={uuid()} className="col-12 col-md-6 col-xl-4 col-xxl-3">
                                <MagicTemplate
                                    id={c.id}
                                    name={c.name}
                                    image={c.image}
                                    rarity={c.rarity || "N/A"}
                                    type={c.type}
                                    price={`$${c.price}`}
                                />
                            </div>
                        ))}
                    </div>
                    <Pagination postsPerPage={postsPerPage} totalPosts={cards.length} paginate={paginate} />
                </div>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    )
}

export default MagicCards;