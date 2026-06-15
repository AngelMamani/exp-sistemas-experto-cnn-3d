/**
 * 11_ResumenInteractivo.js — Diapositiva 11: animación de cierre.
 */
const ResumenInteractivo = {
    Inicializar() {
        window.addEventListener('slidechange', (E) => {
            if (E.detail.id === 'resumen') this.EntradaDiapositiva();
        });
    },

    EntradaDiapositiva() {
        document.querySelectorAll('.ResumenPilar').forEach((Pilar, I) => {
            Pilar.style.animation = 'none';
            void Pilar.offsetWidth;
            Pilar.style.animation = '';
        });
    },
};

window.ResumenInteractivo = ResumenInteractivo;
