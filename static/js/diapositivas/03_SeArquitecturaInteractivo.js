/**
 * 03_SeArquitecturaInteractivo.js — Diapositiva 03: arquitectura + tabs.
 */
const SeArquitecturaInteractivo = {
    Componentes: [],

    Inicializar() {
        this.Componentes = window.PRESENTACION?.componentesSe || [];
        this.InicializarArquitectura();
        this.InicializarTabs();
    },

    InicializarArquitectura() {
        const Nodos = document.querySelectorAll('#arquitecturaSe .ArqNodo[data-componente]');
        if (!Nodos.length) return;

        const Mostrar = (Id) => {
            const Comp = this.Componentes.find((C) => C.Id === Id);
            if (!Comp) return;

            document.getElementById('arqTituloSe').textContent = Comp.Titulo;
            document.getElementById('arqTextoSe').textContent = Comp.Descripcion;
            document.getElementById('arqEjemploSe').textContent = `Ejemplo: ${Comp.Ejemplo}`;

            Nodos.forEach((N) => N.classList.toggle('is-activo', N.dataset.componente === Id));
        };

        Nodos.forEach((Nodo) => {
            Nodo.addEventListener('click', () => Mostrar(Nodo.dataset.componente));
        });

        if (this.Componentes[0]) Mostrar(this.Componentes[0].Id);
    },

    InicializarTabs() {
        const Tabs = document.querySelectorAll('.SeTab[data-tab]');
        const Paneles = document.querySelectorAll('.SeTabPanel[data-panel]');

        Tabs.forEach((Tab) => {
            Tab.addEventListener('click', () => {
                const Id = Tab.dataset.tab;
                Tabs.forEach((T) => T.classList.toggle('is-activo', T === Tab));
                Paneles.forEach((P) => P.classList.toggle('is-activo', P.dataset.panel === Id));
            });
        });
    },
};

window.SeArquitecturaInteractivo = SeArquitecturaInteractivo;
