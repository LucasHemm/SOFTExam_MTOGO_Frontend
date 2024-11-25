export default class OrderFacade {

    constructor() {
        this.url = "http://localhost:5199/api/orderapi";
    }

    async createOrder(order) {
        console.log(order);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create order:", error);
            throw error;
        }
    }

}