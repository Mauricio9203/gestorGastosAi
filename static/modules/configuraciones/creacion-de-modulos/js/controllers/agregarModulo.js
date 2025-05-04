import { crearModulo, crearSubModulo } from "../services/create-module.js";

const agregarModulo = () => {
  document.getElementById("agregarModuloGuardar").addEventListener("click", () => {
    const nombreModulo = document.getElementById("agregarModuloNombre").value; // Puedes obtenerlo desde un input si quieres
    let textoGuion = formatearTextoGuion(nombreModulo);
    let textoGuionBajo = formatearTextoGuionBajo(nombreModulo);
    crearModulo(nombreModulo, textoGuion, textoGuionBajo);
  });
};

const agregarSubModulo = () => {
  document.getElementById("agregarSubModuloGuardar").addEventListener("click", () => {
    const nombreModulo = document.getElementById("selectModulo").value; // Puedes obtenerlo desde un input si quieres
    const nombreSubModulo = document.getElementById("agregarSubModuloNombre").value; // Puedes obtenerlo desde un input si quieres
    let textoGuion = reemplazarGuionPorGuionBajo(nombreModulo);
    let textoGuionBajo = formatearTextoGuionBajo(nombreModulo);

    let subModuloGuion = formatearTextoGuion(nombreSubModulo);
    let subModuloGuionBajo = formatearTextoGuionBajo(nombreSubModulo);
    crearSubModulo(nombreModulo, textoGuion, textoGuionBajo, nombreSubModulo, subModuloGuion, subModuloGuionBajo);
    //crearModulo(nombreModulo, textoGuion, textoGuionBajo);
  });
};

const formatearTextoGuion = (str) =>
  str
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // reemplaza espacios por guiones
    .replace(/^-/, ""); // elimina guión inicial si lo hay

const formatearTextoGuionBajo = (str) =>
  str
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_") // reemplaza espacios por guiones
    .replace(/^-/, ""); // elimina guión inicial si lo hay

const reemplazarGuionPorGuionBajo = (str) =>
  str
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-") // reemplaza guiones por guion bajo
    .replace(/\s+/g, "-"); // también convierte espacios a guion bajo

export { agregarModulo, agregarSubModulo };
