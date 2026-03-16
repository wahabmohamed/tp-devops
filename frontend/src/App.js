import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Chargement...");

  useEffect(() => {
    fetch("http://localhost:5000/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Erreur de connexion au backend"));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "80px" }}>
      <h1>🚀 TP DevOps — CI/CD</h1>
      <h2>Frontend React + Backend Flask</h2>
      <div style={{
        display: "inline-block",
        padding: "16px 32px",
        borderRadius: "8px",
        background: status === "healthy" ? "#d4edda" : "#f8d7da",
        color: status === "healthy" ? "#155724" : "#721c24",
        fontSize: "18px",
        marginTop: "20px"
      }}>
        Backend : {status === "healthy" ? "✅ Connecté" : "❌ " + status}
      </div>
    </div>
  );
}

export default App;
