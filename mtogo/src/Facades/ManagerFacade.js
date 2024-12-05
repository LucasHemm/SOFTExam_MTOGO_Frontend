export default class ManagerFacade {


    async getOrders() {
        try {
            const response = await fetch("http://localhost:8087/api/OrderApi");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            throw error;
        }
    }

    async getCustomers() {
        try {
            const response = await fetch("http://localhost:8087/api/CustomerApi");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            throw error;
        }
    }

    async getAgents() {
        try {
            const response = await fetch("http://localhost:8087/api/AgentApi/All");
            console.log("response", response.url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch agents:", error);
            throw error;
        }
    }

    async getRestaurants() {
        try {
            const response = await fetch("http://localhost:8087/api/RestaurantApi");
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
}