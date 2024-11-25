// RestaurantFacade.js
export default class RestaurantFacade {
    constructor() {
        this.url = "http://localhost:5199/api/restaurantapi";
    }

    async getAllRestaurants() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch restaurants:", error);
            throw error;
        }
    }

    async getRestaurantById(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch restaurant:", error);
            throw error;
        }
    }

    async addRestaurant(restaurant) {
        console.log(restaurant);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurant)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to add restaurant:", error);
            throw error;
        }
    }

    async updateRestaurant(restaurant) {
        try {
            const response = await fetch(`${this.url}/${restaurant.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurant)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to update restaurant:", error);
            throw error;
        }
    }


}
