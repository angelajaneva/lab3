import React from 'react'
import {useHistory} from "react-router";

const add = (props) => {
    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
      const newIngredient = {
          "name": e.target.name.value,
          "amount": e.target.amount.value,
          "veggie": e.target.veggie.checked,
          "spicy": e.target.spicy.checked
      };
      props.onNewTermAdded(newIngredient);
      history.push("/ingredients");
    };

    return (
        <div style={{marginLeft: "5px"}}>
            <form onSubmit={onFormSubmit} className="card">
                <br/>
                <h4 className="text-upper text-left">Add Ingredient</h4>
                <br/><br/>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                    <div className="col-sm-6">
                        <input type="text" name={"name"} className="form-control" id="ingredient" placeholder="Ingredient name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" name={"amount"} className="form-control" id="amount" placeholder="Amount"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <input type="checkbox" name={"veggie"} className="form-control" id="veggie"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <input type="checkbox" name={"spicy"} className="form-control" id="spicy"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
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
export default add;

