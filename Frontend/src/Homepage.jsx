import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide p-4 mt-4">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/go/pokemon-party.jpg" className="d-block w-100 rounded" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpapercave.com/wp/wp2279340.jpg" className="d-block w-100 rounded" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images5.alphacoders.com/134/thumb-1920-1341817.png" className="d-block w-100 rounded" alt="" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='row align-items-center'>
                <div className='col-lg-6 p-5'>
                    <div className="card text-light">
                        <img src="https://wallpapercave.com/wp/wp2279368.jpg" className="card-img-top" alt="Sunset Over the Sea" />
                        <div className="card-img-overlay d-flex">
                            <div className='my-auto mx-auto text-center'>
                                <h2 className='card-title' style={{ fontSize: "3.75em" }}>Yu-Gi-Oh</h2>
                                <Link to={'/yugioh/cards'} className='btn btn-lg btn-primary my-4'>Shop Now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 p-5'>
                    <div className="card text-light">
                        <img src="https://wallpapercave.com/wp/iIXt1rQ.jpg" className="card-img-top" alt="Sunset Over the Sea" />
                        <div className="card-img-overlay d-flex">
                            <div className='my-auto mx-auto text-center'>
                                <h2 className='card-title' style={{ fontSize: "3.75em" }}>Pokemon</h2>
                                <Link to={'/pokemon/cards'} className='btn btn-lg btn-primary my-4'>Shop Now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 p-5'>
                    <div className="card text-light">
                        <img src="https://wallpapercave.com/wp/wp14240726.jpg" className="card-img-top" alt="Sunset Over the Sea" />
                        <div className="card-img-overlay d-flex">
                            <div className='my-auto mx-auto text-center'>
                                <h2 className='card-title' style={{ fontSize: "3.75em" }}>Magic</h2>
                                <Link to={'/mtg/cards'} className='btn btn-lg btn-primary my-4'>Shop Now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 p-5'>
                    <div className="card text-light">
                        <img src="https://wallpapercave.com/wp/wp11123286.jpg" className="card-img-top" alt="Sunset Over the Sea" />
                        <div className="card-img-overlay d-flex">
                            <div className='my-auto mx-auto text-center'>
                                <h2 className='card-title' style={{ fontSize: "3.75em" }}>Digimon</h2>
                                <Link to={'/yugioh/cards'} className='btn btn-lg btn-primary my-4 disabled'>Coming Soon!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;