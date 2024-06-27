
const API_URL = "http://localhost:3000/auth";

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return response.json();
};

export const login = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error logging in", error);
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            throw new Error("Network Error");
        } else {
            throw error;
        }
    }
};
