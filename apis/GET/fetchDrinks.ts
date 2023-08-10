import axios from 'axios'
import {DrinksGET} from '../types'

const fetchdrinks=async() :Promise<DrinksGET[]>=>{
    try {
        const response = await axios.get('https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDrinks');
        console.log(response)
        return response.data.drinks;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchdrinks;