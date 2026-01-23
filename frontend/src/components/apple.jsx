import { useState } from 'react';

function Apple() {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const callapi = async () => {
        console.log("Calling API...");

        try {
            const apiUrl = `http://192.168.1.7:8000/api`; // Laravel API URL

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);

            setName(result );
        } catch (err) {
            setError(err.message || "Failed to fetch data. Please try again.");
        }
    };

    return (
        <div>
            <h1>Hello {name.name}</h1>
            <p>your age is {name.age}</p>
            <p>your email is {name.email}</p>

            <button onClick={callapi}>
                Call API
            </button>

        </div>
    );
}

export default Apple;
