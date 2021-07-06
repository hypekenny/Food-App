import axios from 'axios';

export default function RecipeDetail() {

    function getDetail(id) {
        return axios.get(`http://localhost:3001/recipes/${id}`)
            .then(recipe => console.log(recipe));
    }

    return (
        <div>
            
        </div>
    )
}