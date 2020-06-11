import axios from './custom-axios'
import qs from 'qs'

const service = {

    getIngredientsPaged: (page, pageSize) => {
        return axios.get("/ingredients", {
                headers: {
                    'page': page,
                    'page-size': pageSize
                }
            }
        );
    },

    getIngredients: () => {
        return  axios.get("/ingredients");
    },

    updateIngr: (ingredient) => {
        const data = {
            ...ingredient
        };
        const ingredientId = ingredient.name;
        const formParams = qs.stringify(data);
        return axios.patch("/ingredients/" + ingredientId, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    addIngredient: (ingredient) => {
        //  const ingredientId = ingredient.name;
        const data = {
            ...ingredient
        };
        const formParams = qs.stringify(data);
        return axios.post("/ingredients", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    deleteIngr: (ingredientId) => {
        return axios.delete(`/ingredients/${ingredientId}`);
    }
};

export default service;