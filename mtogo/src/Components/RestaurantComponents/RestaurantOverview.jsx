import {useEffect, useState} from "react";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";

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
        <ul>
            {restaurants.map(restaurant => (
                <li key={restaurant.id}>{restaurant.name}</li>
            ))}
        </ul>
    </div>
  );
}