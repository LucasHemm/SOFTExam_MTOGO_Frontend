export default class PaymentFacade {
    constructor() {
        this.url = "http://payment_app:8087/api/paymentapi";
    }

    async createPayment(payment) {
        console.log(payment);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create payment:", error);
            throw error;
        }
    }

    async getPaymentById(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch payment:", error);
            throw error;
        }
    }
}