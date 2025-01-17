import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import MagicTemplate from "./MagicTemplate";
import Pagination from "../Pagination";
import { Spinner } from "reactstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const MagicCards = () => {

    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);
    const navigate = useNavigate();

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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            navigate(`/mtg/search/${searchTerm}`);
        } catch (error) {
            console.error(error);
            navigate('/mtg/cards');

        }
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const idxOfLastCard = currentPage * postsPerPage;
    const idxOfFirstCard = idxOfLastCard - postsPerPage;
    const currentCards = cards.slice(idxOfFirstCard, idxOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {isLoaded ? (
                <div className="container-fluid text-center">
                    <h1 className="m-5"><strong>Magic The Gathering</strong></h1>
                    <form className="d-flex justify-content-center mb-5" onSubmit={handleSearch}>
                        <input type="text" id="term" name="term" className="col-6 p-1" placeholder="Search" onChange={handleChange} onSubmit={handleSearch} />
                        <Search className="my-auto ms-3 search" size={"1.25em"} onClick={handleSearch} />
                    </form>
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