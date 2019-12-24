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
            pizzas: []
        }
    }

    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients = () => {
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
                //or
                //const terms = prevState.terms.concat(newTerm);
                return {
                    "ingredients": newIngrRef
                }
            });
        });
    };


    updateIngredient = ((editedIngredient) => {
        service.updateIngr(editedIngredient).then((response) => {
            const newIngredient = response.data;
            this.setState((prevState) => {
                const newIngrRef = prevState.ingredients.filter((item) => {
                    if (item.ingredientId === newIngredient.ingredientId) {
                        return newIngredient;
                    }
                    console.log(item);
                    return item;
                });
                return {
                    "ingredients": newIngrRef
                }
            });
        });
    });

    deleteIngredient = (ingredientId) => {
        service.deleteIngr(ingredientId).then((response) => {
            this.setState((state) => {
                const ingredientList = state.ingredients.filter((i) => {
                    return i.name !== ingredientId;
                });
                return {ingredientList};
            });
        })
    };


    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <main>
                        <Route path={"/ingredients"} exact render={() =>
                            <Ingredients obj={this.state.ingredients} onDelete={this.deleteIngredient}/>}>
                        </Route>
                        <Route path={"/pizzas"}>
                            <Pizzas/>
                        </Route>
                        <Route path="/ingredients/:ingredientId/edit" render={() =>
                            <IngredientEdit onSubmit={this.updateIngredient}/>}>
                        </Route>
                        <Route path={"/ingredients/new"} render={() =>
                            <IngredientAdd onNewTermAdded={this.createIngredient}/>}>
                        </Route>
                        <Route path="//ingredients/:ingredientId/details" render={() =>
                            <IngredientDetail/>}>
                        </Route>

                        <Redirect to={"/home"}/>
                    </main>
                </Router>
            </div>
        )
    }
}

export default App;