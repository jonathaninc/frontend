import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
  console.log("API URL: ", apiUrl);

  // Fetch the current count when component mounts
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/status`);
      const data = await response.text();
      setCount(parseInt(data.split(": ")[1], 10));
    } catch (error) {
      console.error("Error fetching status:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchHello = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/hello`);
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching hello message:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const incrementCounter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/increment`, {
        method: "POST",
      });
      const data = await response.text();
      setCount(parseInt(data.split(": ")[1], 10));
      setMessage(`Counter incremented! New value: ${count + 1}`);
    } catch (error) {
      console.error("Error incrementing counter:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const decrementCounter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/decrement`, {
        method: "POST",
      });
      const data = await response.text();
      setCount(parseInt(data.split(": ")[1], 10));
      setMessage(`Counter decremented! New value: ${count - 1}`);
    } catch (error) {
      console.error("Error decrementing counter:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Rest of component remains the same
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jonathan Inc. Counter App</h1>

        <div className="counter-display">
          <h2>Current Count: {count}</h2>
        </div>

        <div className="counter-controls">
          <button onClick={decrementCounter} disabled={loading}>
            -
          </button>
          <button onClick={incrementCounter} disabled={loading}>
            +
          </button>
        </div>

        <button
          className="hello-button"
          onClick={fetchHello}
          disabled={loading}
        >
          Say Hello
        </button>

        {message && <div className="message">{message}</div>}

        {loading && <div className="loading">Loading...</div>}
      </header>
    </div>
  );
}

export default App;
