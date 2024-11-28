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

    async getPendingOrders() {
        try {
            const response = await fetch(this.url+"/status/pending");
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

    async updateOrder(order, paymentId, agentId) {
        console.log(order);
        console.log(paymentId);
        console.log(agentId);
        try{
            const response = await fetch(this.url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({orderId: order.id, status: order.status})
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error("Failed to update order:", error);
            throw error;
        }

        try{
            const response = await fetch(this.url+"/updateids", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({orderId: order.id, agentId: agentId, paymentId: paymentId})
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;

        }catch (error) {
            console.error("Failed to update order:", error);
            throw error;
        }
    }

    async getOrdersByAgentId(agentId) {
        try {
            const response = await fetch(this.url+"/agent/"+agentId);
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

    async deliverOrder(order) {

        try{
            const response = await fetch(this.url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({orderId: order.id, status: order.status})
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }catch (error) {
            console.error("Failed to update order:", error);
            throw error;
        }
    }

    async getFinishedOrders(customerId) {
        try {
            const response = await fetch(this.url+"/customer/"+customerId);
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

    async createReview(review) {
        try {
            const response = await fetch("http://localhost:5199/api/feedbackapi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create review:", error);
            throw error;
        }
    }

}