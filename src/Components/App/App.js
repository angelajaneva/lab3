import React from 'react';
import './App.css';
import Header from '../Header/header'
import Ingredients from '../Ingredients/ingredients'
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Pizzas from '../Pizzas/pizzas';
import service from '../../axiosRepository';
import IngredientEdit from '../Ingredients/EditForm/ingredientEdit'
import IngredientAdd from '../Ingredients/AddIngredient/ingredientAdd'
import IngredientDetail from '../Ingredients/IngredientDetail/ingredientDetail'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            pizzas: [],
            pageSize: 10,
            page: 0,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients = (page = 0) => {
        service.getIngredientsPaged(page, this.state.pageSize).then(response => {
            this.setState((prevState) => {
                return {
                    "ingredients": response.data.content,
                    "page": response.data.page,
                    "pageSize": response.data.pageSize,
                    "totalPages": response.data.totalPages
                }
            })
        })
    };

     loading = () => {
        service.getIngredients().then(response => {
            this.setState((prevState) => {
                return {
                    "ingredients": response.data.content
                }
            })
        })
    };


    createIngredient = (newIngredient) => {
        service.addIngredient(newIngredient).then((response) => {
            const newIngredient = response.data;
            this.setState((prevState) => {
                const newIngrRef = [...prevState.ingredients, newIngredient];
                return {
                    "ingredients": newIngrRef
                }
            });
        });
    };


    updateIngredient = ((editedIngredient) => {
        service.updateIngr(editedIngredient).then(this.loading);
    });

    deleteIngredient = (ingredientId) => {
        service.deleteIngr(ingredientId).then(this.loading)
    };

    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <main>
                        <Route path={"/ingredients"} exact render={() =>
                            <Ingredients obj={this.state.ingredients} onDelete={this.deleteIngredient}
                                         onPageClick={this.loadIngredients} totalPages={this.state.totalPages}/>}>
                        </Route>
                        <Route path={"/pizzas"}>
                            <Pizzas/>
                        </Route>
                        <Route path={"/ingredients/new"} render={() =>
                            <IngredientAdd onNewTermAdded={this.createIngredient}/>}>
                        </Route>
                        <Route path="/ingredients/:ingredientId/edit" render={() =>
                            <IngredientEdit onSubmit={this.updateIngredient}/>}>
                        </Route>
                        <Route path="/ingredients/:ingredientId/details" exact
                        render={() => <IngredientDetail/>}>
                        </Route>
                        <Redirect to={"/home"}/>
                    </main>
                </Router>
            </div>
        )
    }
}

export default App;