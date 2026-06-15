/**
 * TarjetasInteractivas.js
 * Responsabilidad: tarjetas de evaluación interactivas.
 */
const TarjetasInteractivas = {
    Inicializar() {
        document.querySelectorAll('.TarjetaEval--Interactiva').forEach((Tarjeta) => {
            Tarjeta.addEventListener('click', () => {
                document.querySelectorAll('.TarjetaEval--Interactiva').forEach((T) => {
                    T.classList.remove('is-seleccionada');
                });
                Tarjeta.classList.add('is-seleccionada');
            });
        });
    },
};

window.TarjetasInteractivas = TarjetasInteractivas;
