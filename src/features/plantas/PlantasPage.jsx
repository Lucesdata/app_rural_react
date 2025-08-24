import { useEffect, useState } from "react";
import { api } from "../../lib/apiClient";
import { useAuth } from "../../contexts/AuthContext";

export default function PlantasPage() {
  const { user, hasRole } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ nombre:"", ubicacion:"", tipo:"" });
  const [error, setError] = useState("");

  async function load() {
    try { setList(await api("/plantas")); } catch (e) { setError(e.message); }
  }

  useEffect(()=>{ load(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/plantas", { method:"POST", body: form });
      setForm({ nombre:"", ubicacion:"", tipo:"" });
      await load();
    } catch (e) { setError(e.message); }
  }

  async function onDelete(id) {
    try { await api(`/plantas/${id}`, { method:"DELETE" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Plantas</h2>
      <p>Usuario: {user ? `${user.name} (${user.role})` : "visitante"}</p>
      {error && <p style={{ color:"tomato" }}>{error}</p>}

      {hasRole(["ADMIN","OPERARIO"]) && (
        <form onSubmit={onCreate} style={{ display:"grid", gap:8, maxWidth: 520 }}>
          <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
          <input placeholder="Ubicación" value={form.ubicacion} onChange={e=>setForm({...form, ubicacion:e.target.value})} />
          <input placeholder="Tipo" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})} />
          <button>Crear</button>
        </form>
      )}

      <ul>
        {list.map(p => (
          <li key={p.id}>
            #{p.id} · {p.nombre} — {p.ubicacion} · {p.tipo}
            {"  "}
            {hasRole(["ADMIN"]) && (
              <button onClick={()=>onDelete(p.id)} style={{ marginLeft: 8 }}>
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
