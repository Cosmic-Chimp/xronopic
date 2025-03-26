const API_BASE_URL = "http://localhost:5127/api";

export const login = async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        console.error(
            `Login failed: ${response.status} - ${await response.text()}`
        );
    }

    return response.json();
};

export const signup = async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Signup failed");
    }

    return response.json();
};
