// CustomerFacade.js
export default class CustomerFacade {
    constructor() {
        this.url = "http://localhost:8087/api/CustomerApi";
    }

    async createCustomer(customer) { // Accept 'customer' as a parameter
        console.log(customer);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customer) // Use the passed 'customer' object
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create customer:", error);
            throw error;
        }
    }


    async getCustomerById(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch customer:", error);
            throw error;
        }
    }
}
