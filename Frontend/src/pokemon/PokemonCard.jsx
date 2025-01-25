import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid"
import { useParams } from "react-router-dom";
import PokemonTemplate from "./PokemonTemplate";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PokemonCard = () => {
    const { id } = useParams();
    const [card, setCard] = useState();
    const [recommendations, setRecommendations] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function requestCards() {
            try {
                const cardRes = await axios.get(`/api/pokemon/cards/${id}`);
                setCard(cardRes.data);
                const res = await axios.get("/api/pokemon/random");
                setRecommendations(res.data);
                setIsLoaded(!isLoaded);

            } catch (error) {
                console.error(error);
            }
        }
        requestCards();
    }, [window.location.href]);

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = "pokemon";
        const formData = { type, id, quantity: parseFloat(quantity) };
        try {
            await axios.post(`/api/cart`, formData);
            alert("Item added to cart");

        } catch (error) {
            console.error(error);
            alert("Error adding to cart please try again");
            navigate(`/pokemon/cards/${id}`);

        }
    };

    const handleCardClick = (id) => {
        window.location.href = `/pokemon/cards/${id}`;
    };

    return (
        <>
            {isLoaded ? (
                <main className="mt-5 pt-4">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <img src={card.image} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="p-4">
                                    <div className="mb-3">
                                        <a href="">
                                            <span className="badge bg-dark me-1">Pokemon</span>
                                        </a>
                                        <a href="">
                                            <span className="badge bg-info me-1">New</span>
                                        </a>
                                        <a href="">
                                            <span className="badge bg-danger me-1">Bestseller</span>
                                        </a>
                                    </div>

                                    <p className="lead">
                                        <span>${card.price}</span>
                                    </p>

                                    <strong><p style={{ fontSize: "20px" }}>{card.name}</p></strong>

                                    <p>HP: {card.hp} | Rarity: {card.rarity || "N/A"}</p>
                                    <p>{card.flavor_text}</p>

                                    <form className="d-flex justify-content-left" onSubmit={handleSubmit}>
                                        <div className="form-outline me-1" style={{ width: "100px" }}>
                                            <input type="number" min={0} max={card.stock} value={quantity} onChange={handleChange} className="form-control" />
                                        </div>
                                        {card.stock > 0 ? (
                                            <button className="btn btn-primary ms-1" type="submit" >
                                                Add to cart
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary ms-1" type="submit" disabled>
                                                Add to cart
                                            </button>
                                        )}
                                    </form>

                                    <strong><p style={{ fontSize: "20px" }} className="mt-4">In Stock: {card.stock}</p></strong>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 text-center">
                                <h4 className="my-4 h4">Recommended For You</h4>
                            </div>
                        </div>
                        <div className="row text-center">
                            {recommendations.map((c) => (
                                <div key={uuid()} className="col-lg-4 col-md-12 mb-4 p-2" onClick={() => handleCardClick(c.id)}>
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
                </main >
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    );
}

export default PokemonCard;