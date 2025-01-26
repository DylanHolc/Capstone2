import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from "uuid";
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Search } from 'react-bootstrap-icons';
import PokemonTemplate from './PokemonTemplate';
import Pagination from "../Pagination";



const PokemonSearch = () => {

    const { term } = useParams();
    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);
    const navigate = useNavigate();


    useEffect(() => {
        async function searchCards() {
            try {
                const res = await axios.get(`/api/pokemon/search/${term}`);
                setCards(res.data);
                setIsLoaded(!isLoaded);

            } catch (error) {
                console.error(error);
            }
        }
        searchCards();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoaded(false);
        try {
            const res = await axios.get(`/api/pokemon/search/${searchTerm}`);
            setCards(res.data);
            setIsLoaded(true);
        } catch (error) {
            console.error(error);
            navigate('/pokemon/cards');

        }
        navigate(`/pokemon/search/${searchTerm}`);
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
                    <h1 className="m-5"><strong>Pokemon</strong></h1>
                    <form className="d-flex justify-content-center mb-5" onSubmit={handleSearch}>
                        <input type="text" id="term" name="term" className="col-6 p-1" placeholder="Search" onChange={handleChange} onSubmit={handleSearch} />
                        <Search className="my-auto ms-3 search" size={"1.25em"} onClick={handleSearch} />
                    </form>
                    <div className="row">
                        {currentCards.map((c) => (
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
                    <Pagination postsPerPage={postsPerPage} totalPosts={cards.length} paginate={paginate} />
                </div>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    );
};

export default PokemonSearch;