import React from "react";
import { useNavigate } from "react-router-dom";

const YugiohTemplate = ({ image, name, type, id, price }) => {
    const navigate = useNavigate();

    return (
        <div className="card mb-3 p-2" onClick={() => navigate(`/yugioh/cards/${id}`)}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={image}
                        alt={name}
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                    </div>
                    <p className="card-text">
                        <small className="text-muted">Type: {type}</small>
                    </p>
                    <p className="card-text">
                        <strong className="text-muted">{price}</strong>
                    </p>
                </div>
            </div>
        </div >
    );
}

export default YugiohTemplate;