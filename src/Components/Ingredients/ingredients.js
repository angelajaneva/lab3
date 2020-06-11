import React from 'react';
import IngredientsTable from './ingredientsTable'
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';

const ingredients = (props) => {

    function getIngredients() {
        return props.obj.map(ingredient => {
            return (
                <IngredientsTable value={ingredient} key={ingredient.name}
                                  spicy={ingredient.spicy} veggie={ingredient.veggie} onDelete={props.onDelete}/>
            )
        })
    }

    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    };

    const paginate = () => {
        debugger;
        if (props.page !== null) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.totalPages}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    }

    return (
        <div className="row" style={{marginLeft: "5px"}}>
            <h4 className="text-upper text-left">Ingredients</h4>
            <div className="table-responsive">

                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Amount(gr)</th>
                        <th scope="col">Spicy</th>
                        <th scope="col">Veggie</th>
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>

                    {getIngredients()}

                </table>
            </div>
            <div>
            <Link className="btn btn-outline-secondary" to={"ingredients/new"}>
                <span><strong>Add new ingredient</strong></span>
            </Link>
            </div>
            <div>
            {paginate()}
            </div>
        </div>

    );


};
export default ingredients;