import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Code } from "lucide-react";

function App() {
  const [method, setMethod] = useState<
    "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  >("GET");
  const [url, setUrl] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const body = payload.trim() ? JSON.parse(payload) : null;

      const requestOptions: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
      };

      const fetchResponse = await fetch(url, requestOptions);

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
      }

      const result = await fetchResponse.json();
      setResponse(result);
      setError(null);
    } catch (error: unknown) {
      setResponse(null);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <Code className="mr-2 text-purple-600" /> HTTP Request
            </h2>

            <div>
              <label className="block text-sm mb-2">HTTP Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                JSON Payload (optional)
              </label>
              <textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full p-2 border rounded h-32"
              />
            </div>

            <button
              onClick={handleRequest}
              disabled={loading}
              className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
