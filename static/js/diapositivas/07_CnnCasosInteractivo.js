/**
 * 07_CnnCasosInteractivo.js — Diapositiva 07: casos reales + salida ordenada.
 */
const CnnCasosInteractivo = {
    Casos: [],

    Inicializar() {
        this.Casos = window.PRESENTACION?.casosCnn || [];
        this.InicializarCasos();
    },

    InicializarCasos() {
        const Cards = document.querySelectorAll('.CasoCard--Cnn[data-caso-id]');
        if (!Cards.length) return;

        Cards.forEach((Card) => {
            Card.addEventListener('click', () => {
                Cards.forEach((C) => C.classList.remove('is-seleccionado'));
                Card.classList.add('is-seleccionado');
                this.MostrarCaso(Card.dataset.casoId);
            });
        });

        document.getElementById('btnEjecutarCasoCnn')?.addEventListener('click', () => {
            const Seleccionado = document.querySelector('.CasoCard--Cnn.is-seleccionado');
            if (Seleccionado) this.EjecutarCaso(Seleccionado.dataset.casoId);
        });

        if (this.Casos[0]) this.MostrarCaso(this.Casos[0].Id);
    },

    MostrarCaso(CasoId) {
        const Caso = this.Casos.find((C) => C.Id === CasoId);
        if (!Caso) return;

        document.getElementById('casoCnnTitulo').textContent = `${Caso.Titulo} — ${Caso.Subtitulo}`;
        document.getElementById('casoCnnDesc').textContent = Caso.Descripcion;
        document.getElementById('casoCnnEsperado').textContent = Caso.ResultadoEsperado;

        const Lista = document.getElementById('casoCnnEntrada');
        Lista.innerHTML = (Caso.EntradaLegible || []).map((H) => `<li>${H}</li>`).join('');
    },

    CrearSeccion(Titulo, Items) {
        if (!Items.length) return null;

        const Seccion = document.createElement('div');
        Seccion.className = 'CnnResultadoSeccion';

        const TituloDom = document.createElement('h4');
        TituloDom.className = 'CnnResultadoSeccion__Titulo';
        TituloDom.textContent = Titulo;
        Seccion.appendChild(TituloDom);

        const Lista = document.createElement('ul');
        Lista.className = 'CnnResultadoLista';

        Items.forEach(({ Badge, Texto, Destacado, Fin }) => {
            const Item = document.createElement('li');
            Item.className = 'CnnResultadoItem';
            if (Destacado) Item.classList.add('CnnResultadoItem--destacado');
            if (Fin) Item.classList.add('CnnResultadoItem--fin');
            Item.innerHTML = `
                <span class="CnnResultadoItem__Badge">${Badge}</span>
                <p class="CnnResultadoItem__Texto">${Texto}</p>
            `;
            Lista.appendChild(Item);
        });

        Seccion.appendChild(Lista);
        return Seccion;
    },

    RenderizarResultado(Cnn, Caso) {
        const Contenedor = document.getElementById('casoCnnResultado');
        const Stats = document.getElementById('cnnStats');
        if (!Contenedor) return;

        Contenedor.innerHTML = '';

        const Tamano = Cnn.TamanoLesion
            ? `${Cnn.TamanoLesion} ${Cnn.Unidad || ''}`
            : 'N/A';

        if (Stats) {
            Stats.hidden = false;
            document.getElementById('cnnStatConfianza').textContent = `${Cnn.Confianza ?? '—'}%`;
            document.getElementById('cnnStatTamano').textContent = Tamano;
            document.getElementById('cnnStatRegion').textContent = Cnn.Region || '—';
        }

        const Secciones = [
            this.CrearSeccion('1 · Procesamiento', [
                { Badge: 'Entrada', Texto: `Volumen recibido — caso <strong>${Caso?.Titulo || 'seleccionado'}</strong>` },
                { Badge: 'Motor', Texto: 'Simulador Django ejecutando capas Conv3D + clasificación' },
            ]),
            this.CrearSeccion('2 · Detección', [
                {
                    Badge: 'Clase',
                    Texto: `<strong>${Cnn.Clase || 'Detección completada'}</strong>`,
                    Destacado: true,
                },
                {
                    Badge: 'Confianza',
                    Texto: `Probabilidad del modelo: <strong>${Cnn.Confianza ?? '—'}%</strong>`,
                    Destacado: true,
                },
            ]),
            this.CrearSeccion('3 · Métricas espaciales', [
                { Badge: 'Región', Texto: `Zona detectada: <strong>${Cnn.Region || '—'}</strong>` },
                { Badge: 'Tamaño', Texto: `Dimensión estimada: <strong>${Tamano}</strong>` },
                {
                    Badge: 'Crítica',
                    Texto: `Región crítica: <strong>${Cnn.RegionCritica ? 'Sí' : 'No'}</strong>`,
                },
                {
                    Badge: 'Opacidad',
                    Texto: `Opacidad detectada: <strong>${Cnn.Opacidad ? 'Sí' : 'No'}</strong>`,
                },
            ]),
            this.CrearSeccion('4 · Cierre', [
                {
                    Badge: 'Fin',
                    Texto: `Análisis completado — listo para enviar hechos al Sistema Experto.`,
                    Fin: true,
                },
            ]),
        ];

        Secciones.filter(Boolean).forEach((S) => Contenedor.appendChild(S));

        const Conclusion = document.createElement('div');
        Conclusion.className = 'CnnConclusionFinal';
        Conclusion.innerHTML = `
            <strong>Resultado:</strong> ${Cnn.Clase || 'Detección completada'}
            <span class="CnnConclusionFinal__Meta">${Cnn.Confianza ?? '—'}% confianza · ${Tamano} · ${Cnn.Region || '—'}</span>
        `;
        Contenedor.appendChild(Conclusion);
    },

    async EjecutarCaso(CasoId) {
        const Contenedor = document.getElementById('casoCnnResultado');
        const Stats = document.getElementById('cnnStats');
        const Btn = document.getElementById('btnEjecutarCasoCnn');
        const Caso = this.Casos.find((C) => C.Id === CasoId);

        if (Btn) {
            Btn.disabled = true;
            Btn.textContent = '⏳ Procesando volumen...';
        }

        if (Stats) Stats.hidden = true;
        Contenedor.innerHTML = '<p class="Placeholder CnnResultado__Vacio">⏳ Procesando volumen 3D con Django...</p>';

        try {
            const Resultado = await ClienteApi.AnalizarVolumen({ CasoId });
            this.RenderizarResultado(Resultado.Cnn || {}, Caso);
        } catch (Err) {
            Contenedor.innerHTML = `<p class="Placeholder CnnResultado__Vacio">Error: ${Err.message}</p>`;
        } finally {
            if (Btn) {
                Btn.disabled = false;
                Btn.textContent = '⚡ Analizar volumen con Django';
            }
        }
    },
};

window.CnnCasosInteractivo = CnnCasosInteractivo;
