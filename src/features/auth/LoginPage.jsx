import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const nav = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("admin@demo.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "48px auto" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} type="submit">{loading ? "Entrando..." : "Entrar"}</button>
      </form>
      {error && <p style={{ color:"tomato" }}>{error}</p>}
    </div>
  );
}
