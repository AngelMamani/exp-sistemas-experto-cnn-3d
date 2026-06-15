/**
 * 04_SeCasoMycinInteractivo.js — Diapositiva 04: flujo + simulación MYCIN.
 */
const SeCasoMycinInteractivo = {
    PasosFlujo: [],

    Inicializar() {
        this.PasosFlujo = window.PRESENTACION?.pasosFlujoSe || [];
        this.InicializarFlujo();
        document.getElementById('btnSimularMycin')?.addEventListener('click', () => {
            this.EjecutarSimulacion();
        });
    },

    InicializarFlujo() {
        const PasosDom = document.querySelectorAll('#flujoSe .SeFlujoPaso[data-paso-id]');
        if (!PasosDom.length) return;

        const Mostrar = (Id) => {
            const Paso = this.PasosFlujo.find((P) => P.Id === Id);
            if (!Paso) return;

            document.getElementById('sePasoTitulo').textContent = Paso.Titulo;
            document.getElementById('sePasoTexto').textContent = Paso.Descripcion;

            PasosDom.forEach((N) => N.classList.toggle('is-activo', N.dataset.pasoId === Id));
        };

        PasosDom.forEach((Nodo) => {
            Nodo.addEventListener('click', () => Mostrar(Nodo.dataset.pasoId));
        });

        document.getElementById('btnAnimarFlujoSe')?.addEventListener('click', () => {
            let Indice = 0;
            const Ids = this.PasosFlujo.map((P) => P.Id);
            const Intervalo = setInterval(() => {
                if (Indice < Ids.length) {
                    Mostrar(Ids[Indice]);
                    Indice++;
                } else {
                    clearInterval(Intervalo);
                }
            }, 600);
        });

        if (this.PasosFlujo[0]) Mostrar(this.PasosFlujo[0].Id);
    },

    ObtenerHechos() {
        const Hechos = {
            Fiebre: false,
            Tos: false,
            DolorToracico: false,
            OpacidadImagen: false,
            LesionGrande: false,
            RegionCritica: false,
            ConfianzaAlta: false,
        };

        document.querySelectorAll('#sintomasMycin input[data-hecho]').forEach((Input) => {
            Hechos[Input.dataset.hecho] = Input.checked;
        });

        return Hechos;
    },

    ObtenerEtiquetaTipo(Tipo, Mensaje) {
        if (Tipo === 'inicio') return 'Inicio';
        if (Tipo === 'hechos') return 'Hechos';
        if (Tipo === 'evaluacion') return Mensaje?.includes('ACTIVADA') ? 'Activada' : 'Evaluación';
        if (Tipo === 'regla') return 'Conclusión';
        if (Tipo === 'fin') return 'Fin';
        return Tipo;
    },

    CrearItemTimeline(Entrada) {
        const Item = document.createElement('li');
        const EsExito = Entrada.Mensaje?.includes('ACTIVADA');
        Item.className = `SeTimeline__Item SeTimeline__Item--${Entrada.Tipo}`;
        if (EsExito) Item.classList.add('SeTimeline__Item--Exito');

        const Etiqueta = this.ObtenerEtiquetaTipo(Entrada.Tipo, Entrada.Mensaje);
        Item.innerHTML = `
            <span class="SeTimeline__Badge">${Etiqueta}</span>
            <p class="SeTimeline__Texto">${Entrada.Mensaje}</p>
        `;
        return Item;
    },

    CrearSeccion(Titulo, Entradas) {
        if (!Entradas.length) return null;

        const Seccion = document.createElement('div');
        Seccion.className = 'SeTimelineSeccion';

        const TituloDom = document.createElement('h4');
        TituloDom.className = 'SeTimelineSeccion__Titulo';
        TituloDom.textContent = Titulo;
        Seccion.appendChild(TituloDom);

        const Lista = document.createElement('ul');
        Lista.className = 'SeTimelineLista';
        Entradas.forEach((Entrada) => Lista.appendChild(this.CrearItemTimeline(Entrada)));
        Seccion.appendChild(Lista);

        return Seccion;
    },

    RenderizarTimeline(Log) {
        const Timeline = document.getElementById('seTimeline');
        const Stats = document.getElementById('seStats');
        if (!Timeline) return;

        const Inicio = Log.filter((E) => E.Tipo === 'inicio' || E.Tipo === 'hechos');
        const Evaluaciones = Log.filter((E) => E.Tipo === 'evaluacion');
        const Reglas = Log.filter((E) => E.Tipo === 'regla');
        const Fin = Log.filter((E) => E.Tipo === 'fin');
        const Activadas = Evaluaciones.filter((E) => E.Mensaje?.includes('ACTIVADA'));

        Timeline.innerHTML = '';

        const Secciones = [
            this.CrearSeccion('1 · Contexto', Inicio),
            this.CrearSeccion('2 · Evaluación de reglas', Evaluaciones),
            this.CrearSeccion('3 · Conclusiones generadas', Reglas),
            this.CrearSeccion('4 · Cierre', Fin),
        ];

        Secciones.filter(Boolean).forEach((S) => Timeline.appendChild(S));

        if (Stats) {
            Stats.hidden = false;
            document.getElementById('seStatEvaluadas').textContent = Evaluaciones.length;
            document.getElementById('seStatActivadas').textContent = Activadas.length;
            document.getElementById('seStatPasos').textContent = Log.length;
        }
    },

    async EjecutarSimulacion() {
        const Timeline = document.getElementById('seTimeline');
        const Conclusion = document.getElementById('seConclusion');
        const Stats = document.getElementById('seStats');
        const Btn = document.getElementById('btnSimularMycin');

        if (Btn) {
            Btn.disabled = true;
            Btn.textContent = '⏳ Procesando...';
        }

        if (Stats) Stats.hidden = true;
        Timeline.innerHTML = '<p class="Placeholder SeTimeline__Vacio">Evaluando reglas...</p>';
        Conclusion.hidden = true;

        try {
            const Resultado = await ClienteApi.Inferir(this.ObtenerHechos());
            this.RenderizarTimeline(Resultado.Log || []);

            Conclusion.hidden = false;
            Conclusion.innerHTML = `
                <strong>Conclusión principal:</strong> ${Resultado.ConclusionPrincipal}
                <span class="SeConclusion__Meta">${(Resultado.ReglasActivadas || []).length} regla(s) activada(s) · motor Django</span>
            `;
        } catch (Err) {
            Timeline.innerHTML = `<p class="Placeholder SeTimeline__Vacio">Error: ${Err.message}</p>`;
        } finally {
            if (Btn) {
                Btn.disabled = false;
                Btn.textContent = '⚡ Simular con Django';
            }
        }
    },
};

window.SeCasoMycinInteractivo = SeCasoMycinInteractivo;
