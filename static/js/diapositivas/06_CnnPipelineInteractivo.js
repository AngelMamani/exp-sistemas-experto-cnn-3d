/**
 * 06_CnnPipelineInteractivo.js — Diapositiva 06: pipeline + tabs 2D/3D.
 */
const CnnPipelineInteractivo = {
    Pasos: [],

    Inicializar() {
        this.Pasos = window.PRESENTACION?.pasosPipelineCnn || [];
        this.InicializarPipeline();
        this.InicializarTabs();
    },

    InicializarPipeline() {
        const PasosDom = document.querySelectorAll('#pipelineCnn .PipelineCnn__Paso[data-paso-id]');
        if (!PasosDom.length) return;

        const Mostrar = (Id) => {
            const Paso = this.Pasos.find((P) => P.Id === Id);
            if (!Paso) return;

            document.getElementById('cnnPasoTitulo').textContent = Paso.Titulo;
            document.getElementById('cnnPasoTexto').textContent = Paso.Descripcion;
            document.getElementById('cnnPasoEjemplo').textContent = `Ejemplo: ${Paso.Ejemplo}`;

            PasosDom.forEach((N) => N.classList.toggle('is-activo', N.dataset.pasoId === Id));
        };

        PasosDom.forEach((Nodo) => {
            Nodo.addEventListener('click', () => Mostrar(Nodo.dataset.pasoId));
        });

        document.getElementById('btnAnimarPipelineCnn')?.addEventListener('click', () => {
            let Indice = 0;
            const Ids = this.Pasos.map((P) => P.Id);
            const Intervalo = setInterval(() => {
                if (Indice < Ids.length) {
                    Mostrar(Ids[Indice]);
                    Indice++;
                } else {
                    clearInterval(Intervalo);
                }
            }, 700);
        });

        if (this.Pasos[0]) Mostrar(this.Pasos[0].Id);
    },

    InicializarTabs() {
        const Tabs = document.querySelectorAll('.CnnTab[data-tab]');
        const Paneles = document.querySelectorAll('.CnnTabPanel[data-panel]');

        Tabs.forEach((Tab) => {
            Tab.addEventListener('click', () => {
                const Id = Tab.dataset.tab;
                Tabs.forEach((T) => T.classList.toggle('is-activo', T === Tab));
                Paneles.forEach((P) => P.classList.toggle('is-activo', P.dataset.panel === Id));
            });
        });
    },
};

window.CnnPipelineInteractivo = CnnPipelineInteractivo;
