/**
 * ConfigPresentacion.js
 * Lee la configuración inyectada por Django vía json_script.
 */
(function InicializarConfigPresentacion() {
    const Elemento = document.getElementById('presentacion-data');
    window.PRESENTACION = Elemento ? JSON.parse(Elemento.textContent) : {};
})();
