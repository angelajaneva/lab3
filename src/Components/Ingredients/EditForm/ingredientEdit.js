import React, {useState, useEffect} from 'react';
import axios from '../../../custom-axios'
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";

const edit = (props) => {


    const history = useHistory();
    const [ingredient, setIngredient] = useState({});
    const {ingredientId} = useParams();

    useEffect(() => {
        axios.get("/ingredients/" + ingredientId).then(data => {
            setIngredient(data.data) //go setirame objektot da bide so vredn koja sto ja vrakja f-jata
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            "name": ingredientId,
            "amount": e.target.amount.value,
            "veggie": e.target.veggie.checked,
            "spicy": e.target.spicy.checked
        });
        history.push("/ingredients");
    };


    const onChangeHandler = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setIngredient({paramName:paramValue});
    };

    const inputHandler = (e) => {
        return e.target.name.value.length < 50 &&
            e.target.amount.value.toString().length < 50 &&
            e.target.name.value.length > 0 &&
            e.target.amount.value.toString().length > 0;
    };

    return (
        <div style={{marginLeft: "5px"}}>
            <form className="card" onSubmit={onFormSubmit}>
                <br/>
                <h4 className="text-upper text-left">Edit Ingredient</h4>
                <br/><br/>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" name={"name"} onChange={onChangeHandler}
                               id="ingredient" value={ingredient.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" name={"amount"} onChange={onChangeHandler}
                               id="amount"
                               defaultValue={ingredient.amount}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <input type="checkbox" className="form-control" onChange={onChangeHandler} name={"veggie"}
                               checked={ingredient.veggie} id="veggie"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <input type="checkbox" className="form-control" onChange={onChangeHandler} name={"spicy"}
                               checked={ingredient.spicy} id="spicy"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button disabled={!inputHandler}
                            type="submit"
                            className="btn btn-primary text-upper">
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            className="btn btn-warning text-upper">
                            Reset
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            className="btn btn-danger text-upper">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};
export default edit;