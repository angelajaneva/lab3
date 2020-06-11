import React, {useEffect, useState} from 'react';
import axios from '../../../custom-axios'
import {useParams} from "react-router-dom";

const ingredientDetail = (props) => {

    const ingredientId = useParams();
    const [pizza, setPizza] = useState({});

    useEffect(() => {
        axios.get("/ingredients/" + ingredientId + "/pizzas").then((data) => {
            setPizza(data.data);
        })
    }, []);

    console.log();
    debugger;

    return (

        <div className="row">
            <div className="card mx-auto text-center">
                <div className="card-header">
                    <h4 className="text-info text-center text-uppercase">Ingredient - {ingredientId.name}</h4>
                </div>


            </div>
        </div>
    )

};
export default ingredientDetail;