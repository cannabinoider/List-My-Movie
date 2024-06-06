export const signUp = async (username, email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LOCATION}/signup`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: username,
                email: email,
                password: password
            }),
            cache: "no-cache"
        });
        const newResponse=await response.json();
        if (!response.ok) {
            return newResponse.message;
        } else {
            return newResponse.message;
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        return "Something gone wrong";
    }
};

export const userLogin = async (username, password) => {
    console.log("hello");
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LOCATION}/login`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                username: username,
                password: password
            },
            cache: "no-cache"
        });
        const newResponse=await response.json();
        if (!response.ok) {
            return newResponse;
        } else {
            return newResponse;
        }
    } catch (error) {
        console.error("Error during login:", error);
        return "Something gone wrong";
    }
};


