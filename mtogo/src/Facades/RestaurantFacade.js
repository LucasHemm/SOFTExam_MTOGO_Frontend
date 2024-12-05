// RestaurantFacade.js
export default class RestaurantFacade {
    constructor() {
        this.url = "http://localhost:8087/api/restaurantapi";
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

    //get all menu items for a restaurant
    async getRestaurantMenuItems(id) {
        try {
            const response = await fetch(`${this.url}/menuitems/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch menu items:", error);
            throw error;
        }
    }

    //add menu item to a restaurant
    async createMenuItem(menuItem) {


        try {
            const response = await fetch(`${this.url}/menuitem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menuItem)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to add menu item:", error);
            throw error;
        }
    }

    //update menu item for a restaurant
    async updateMenuItem(menuItem) {
        try {
            const response = await fetch(`${this.url}/menuitem/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menuItem)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to update menu item:", error);
            throw error;
        }
    }
}
