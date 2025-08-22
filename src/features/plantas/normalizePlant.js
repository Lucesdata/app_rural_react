export function toNumber(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function normalizePlant(p) {
  return {
    id: String(p.id ?? p.planta ?? ""),
    planta: p.planta ?? p.nombre ?? "Planta",
    nombre: p.nombre ?? p.planta ?? "",
    vereda: p.vereda ?? "",
    corregimiento: p.corregimiento ?? "",
    fuente: p.fuente ?? "",
    tipoAgua: p.tipoAgua ?? p["tipoAgua"] ?? "",
    tipoPlanta: p.tipoPlanta ?? "",
    conduccion: p.conduccion ?? "",
    tanqueAbastec: p.tanqueAbastec ?? p["tanqueAbastec."] ?? "",
    desarenador: p.desarenador ?? "",
    desinfeccion: p.desinfeccion ?? "",
    caudalDiseno: toNumber(p.caudaDiseño ?? p.caudalDiseño ?? p.caudalDiseno),
    caudalConcesion: toNumber(p.caudalConcesion ?? p["caudalConcesion "]),
    usuarios: toNumber(p.usuarios),
    poblacion: toNumber(p.poblacion ?? p["Población"]),
    lat: toNumber(p.lat ?? p.latitud),
    lng: toNumber(p.lng ?? p.longitud),
  };
}
