/**
 * 08_ComparacionInteractivo.js — Diapositiva 08: comparación dinámica SE vs CNN.
 */
const ComparacionInteractivo = {
    Criterios: [],
    Escenarios: [],
    ModoActual: 'ambos',

    Inicializar() {
        const Config = window.PRESENTACION || {};
        this.Criterios = Config.comparacionCriterios || [];
        this.Escenarios = Config.comparacionEscenarios || [];

        this.InicializarSlider();
        this.InicializarCriterios();
        this.InicializarModos();
        this.InicializarEscenarios();

        if (this.Criterios[0]) this.MostrarCriterio(this.Criterios[0].Id);
    },

    InicializarSlider() {
        const Slider = document.getElementById('sliderComparador');
        if (!Slider) return;

        const Actualizar = (Valor) => {
            const LadoSe = document.getElementById('ladoSe');
            const LadoCnn = document.getElementById('ladoCnn');
            const PctSe = document.getElementById('pctSe');
            const PctCnn = document.getElementById('pctCnn');
            const TextoSe = document.getElementById('textoLadoSe');
            const TextoCnn = document.getElementById('textoLadoCnn');

            const InvSe = 100 - Valor;
            if (LadoSe) LadoSe.style.flex = `${InvSe}`;
            if (LadoCnn) LadoCnn.style.flex = `${Valor}`;
            if (PctSe) PctSe.textContent = `${InvSe}%`;
            if (PctCnn) PctCnn.textContent = `${Valor}%`;

            if (TextoSe) {
                TextoSe.textContent = InvSe >= 60
                    ? 'Dominante: razonamiento y reglas'
                    : InvSe >= 40
                        ? 'Reglas · Inferencia · Explicación'
                        : 'Apoyo a la decisión clínica';
            }
            if (TextoCnn) {
                TextoCnn.textContent = Valor >= 60
                    ? 'Dominante: percepción volumétrica'
                    : Valor >= 40
                        ? 'Volúmenes · Patrones · Detección'
                        : 'Entrada visual al sistema';
            }
        };

        Slider.addEventListener('input', (E) => Actualizar(parseInt(E.target.value, 10)));
        Actualizar(parseInt(Slider.value, 10));
    },

    InicializarCriterios() {
        const Botones = document.querySelectorAll('.ComparacionCriterio[data-criterio-id]');
        Botones.forEach((Btn) => {
            Btn.addEventListener('click', () => {
                Botones.forEach((B) => B.classList.remove('is-activo'));
                Btn.classList.add('is-activo');
                this.MostrarCriterio(Btn.dataset.criterioId);
            });
        });
    },

    MostrarCriterio(Id) {
        const C = this.Criterios.find((X) => X.Id === Id);
        if (!C) return;

        document.getElementById('detalleCriterioTitulo').textContent = `${C.Icono} ${C.Criterio}`;
        document.getElementById('detalleValorSe').textContent = C.Se;
        document.getElementById('detalleValorCnn').textContent = C.Cnn;
        document.getElementById('detalleTextoSe').textContent = C.DetalleSe;
        document.getElementById('detalleTextoCnn').textContent = C.DetalleCnn;
        document.getElementById('detalleAnalogiaTexto').textContent = C.Analogia;

        this.AplicarModoVista();
    },

    InicializarModos() {
        const Modos = document.querySelectorAll('.ComparacionModo[data-modo]');
        const Slide = document.getElementById('comparacion');

        Modos.forEach((Btn) => {
            Btn.addEventListener('click', () => {
                Modos.forEach((M) => M.classList.remove('is-activo'));
                Btn.classList.add('is-activo');
                this.ModoActual = Btn.dataset.modo;
                if (Slide) Slide.dataset.modoVista = this.ModoActual;
                this.AplicarModoVista();

                const Slider = document.getElementById('sliderComparador');
                if (!Slider) return;
                if (this.ModoActual === 'se') Slider.value = 15;
                if (this.ModoActual === 'cnn') Slider.value = 85;
                if (this.ModoActual === 'ambos') Slider.value = 50;
                Slider.dispatchEvent(new Event('input'));
            });
        });
    },

    AplicarModoVista() {
        const ColSe = document.getElementById('detalleColSe');
        const ColCnn = document.getElementById('detalleColCnn');
        if (!ColSe || !ColCnn) return;

        ColSe.classList.remove('is-resaltado', 'is-atenuado');
        ColCnn.classList.remove('is-resaltado', 'is-atenuado');

        if (this.ModoActual === 'se') {
            ColSe.classList.add('is-resaltado');
            ColCnn.classList.add('is-atenuado');
        } else if (this.ModoActual === 'cnn') {
            ColCnn.classList.add('is-resaltado');
            ColSe.classList.add('is-atenuado');
        } else {
            ColSe.classList.add('is-resaltado');
            ColCnn.classList.add('is-resaltado');
        }
    },

    InicializarEscenarios() {
        const Botones = document.querySelectorAll('.ComparacionEscenario[data-escenario]');
        const Detalle = document.getElementById('escenarioDetalle');
        if (!Botones.length) return;

        const Mostrar = (Id) => {
            const Esc = this.Escenarios.find((E) => E.Id === Id);
            if (!Esc || !Detalle) return;
            Detalle.textContent = `Ejemplo: ${Esc.Ejemplo}`;
            Botones.forEach((B) => B.classList.toggle('is-activo', B.dataset.escenario === Id));
        };

        Botones.forEach((Btn) => {
            Btn.addEventListener('click', () => Mostrar(Btn.dataset.escenario));
        });

        if (this.Escenarios[0]) Mostrar(this.Escenarios[0].Id);
    },
};

window.ComparacionInteractivo = ComparacionInteractivo;
