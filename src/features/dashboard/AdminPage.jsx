import { useAuth } from "../../contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Panel de Admin</h2>
      <p>Hola {user?.name} ({user?.role})</p>
      <p>Solo usuarios con rol <b>ADMIN</b> pueden ver esto.</p>
    </div>
  );
}
