export default class AgentFacade {
    constructor() {
        this.url = "http://localhost:8087/api/agentapi";
    }

    async createAgent(agent) {
        console.log(agent);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agent)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create agent:", error);
            throw error;
        }
    }

    async getAgentById(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch agent:", error);
            throw error;
        }
    }
}