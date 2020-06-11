import React from 'react';
import {Link} from "react-router-dom";

const ingredientsTable = (props) => {

    const deleteHandler = (e) => {
        e.preventDefault();
        props.onDelete(props.value.name);
        debugger;
    };

    return (
        <tbody>
        <tr>
            <td scope="col">{props.value.name}</td>
            <td scope="col">{props.value.amount}</td>
            <td scope="col">{props.spicy ? "yes" : "no"}</td>
            <td scope="col">{props.veggie ? "yes" : "no"}</td>
            <td scope="col">
                <Link className="btn btn-sm btn-secondary" to={"/ingredients/"+props.value.name+"/edit"}>
                    <span className="fa fa-edit"/>
                    <span><strong>Edit</strong></span>
                </Link>
                <button type="button" onClick={deleteHandler} className="btn btn-sm btn-outline-secondary ">
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                <Link className="btn btn-sm btn-outline-dark" to={"/ingredients/"+props.value.name+"/details"}>
                    <span><strong>Details</strong></span>
                </Link>
            </td>
        </tr>
        </tbody>
    )
};

export default ingredientsTable;