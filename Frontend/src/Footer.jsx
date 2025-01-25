import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, TwitterX, Linkedin, Github, Instagram, Youtube, EnvelopeFill, PhoneFill, BuildingFill } from 'react-bootstrap-icons';
const Footer = () => {

    return (
        <>
            <footer className="text-center text-lg-start bg-light text-dark footer">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with me on social networks:</span>
                    </div>
                    <div>
                        <Link className="navbar-brand me-4 text-reset" to="https://www.facebook.com/"><Facebook size={"1.5em"} color='black' className='m-2' /></Link>
                        <Link className="navbar-brand me-4 text-reset" to="https://www.instagram.com/"><Instagram size={"1.5em"} color='black' className='m-2' /></Link>
                        <Link className="navbar-brand me-4 text-reset" to="https://x.com/"><TwitterX size={"1.5em"} color='black' className='m-2' /></Link>
                        <Link className="navbar-brand me-4 text-reset" to="https://www.youtube.com/"><Youtube size={"1.5em"} color='black' className='m-2' /></Link>
                        <Link className="navbar-brand me-4 text-reset" to="https://www.linkedin.com/in/dylan-holcomb-179036231/"><Linkedin size={"1.5em"} color='black' className='m-2' /></Link>
                        <Link className="navbar-brand me-4 text-reset" to="https://github.com/DylanHolc"><Github size={"1.5em"} color='black' className='m-2' /></Link>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>TCG Clone
                                </h6>
                                <p>
                                    A web development project meant to emulate popular trading card websites utilizing vite, react, javascript, sequelize, and express.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p>
                                    <Link to={'/pokemon/cards'} className='text-dark'>Pokemon</Link>

                                </p>
                                <p>
                                    <Link to={'/yugioh/cards'} className='text-dark'>Yu-Gi-Oh</Link>

                                </p>
                                <p>
                                    <Link to={'/mtg/cards'} className='text-dark'>Magic</Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="https://vite.dev/" className="text-reset">Vite</a>
                                </p>
                                <p>
                                    <a href="https://react.dev/" className="text-reset">React</a>
                                </p>
                                <p>
                                    <a href="https://developer.mozilla.org/en-US/" className="text-reset">MDN</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 mx-2">Contact</h6>
                                <p><BuildingFill className='mx-2' /> Dallas TX 75206, US</p>
                                <p><EnvelopeFill className='mx-2' /> holcombdylan12@gmail.com</p>
                                <p><PhoneFill className='mx-2' /> + (940)-536-9808</p>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;

