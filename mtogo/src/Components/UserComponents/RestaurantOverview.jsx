import {useEffect, useState} from "react";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";
import Table from 'react-bootstrap/Table';

export default function RestaurantOverview() {
    const [restaurants, setRestaurants] = useState([])
    const restaurantFacade = new RestaurantFacade();


    useEffect(() => {
        restaurantFacade.getAllRestaurants()
            .then(data => {
                setRestaurants(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

  return (
    <div>
        <h1>Restaurants</h1>
        <Table className={"striped bordered hover"} >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Cuisine type</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {restaurants.map(restaurant => (
                    <tr key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.address.street}/{restaurant.address.city}/{restaurant.address.zipCode}/{restaurant.address.region}</td>
                        <td>{restaurant.cuisineType}</td>
                        <td>{restaurant.rating}({restaurant.numberOfRatings})</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  );
}