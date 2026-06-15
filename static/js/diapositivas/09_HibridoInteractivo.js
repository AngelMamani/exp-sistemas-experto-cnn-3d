/**
 * 09_HibridoInteractivo.js — Diapositiva 09: caso real CNN + SE trabajando juntos.
 */
const HibridoInteractivo = {
    Ejecutando: false,
    Caso: null,

    Inicializar() {
        this.Caso = window.PRESENTACION?.casoHibrido || {};

        document.getElementById('btnFlujoHibridoSlide')?.addEventListener('click', () => {
            this.EjecutarFlujoEspectacular();
        });

        window.addEventListener('slidechange', (E) => {
            if (E.detail.id === 'hibrido') this.EntradaDiapositiva();
        });
    },

    EntradaDiapositiva() {
        const PrimerNodo = document.querySelector('[data-paso="entrada"]');
        PrimerNodo?.classList.add('is-activo');
        setTimeout(() => PrimerNodo?.classList.remove('is-activo'), 1200);
    },

    Resetear() {
        document.querySelectorAll('.HibridoNodo').forEach((N) => {
            N.classList.remove('is-activo', 'is-completado');
        });
        document.querySelectorAll('.HibridoPuente').forEach((P) => P.classList.remove('is-activo'));
        document.querySelectorAll('[id^="estado-"]').forEach((El) => {
            El.textContent = 'En espera…';
        });
        document.getElementById('hibrido')?.classList.remove('is-celebracion');
        document.getElementById('hibridoVeredictoPanel')?.classList.remove('is-celebracion');
    },

    ActivarNodo(Id, Texto) {
        const Nodo = document.getElementById(`nodo-${Id}`);
        const Estado = document.getElementById(`estado-${Id}`);
        if (Nodo) {
            document.querySelectorAll('.HibridoNodo').forEach((N) => N.classList.remove('is-activo'));
            Nodo.classList.add('is-activo');
        }
        if (Estado && Texto) Estado.textContent = Texto;
    },

    CompletarNodo(Id) {
        document.getElementById(`nodo-${Id}`)?.classList.remove('is-activo');
        document.getElementById(`nodo-${Id}`)?.classList.add('is-completado');
    },

    ActivarPuente(Indice) {
        const Puente = document.querySelector(`[data-puente="${Indice}"]`);
        if (!Puente) return;
        Puente.classList.remove('is-activo');
        void Puente.offsetWidth;
        Puente.classList.add('is-activo');
    },

    AgregarLog(Badge, Texto, Tipo = 'puente') {
        const Timeline = document.getElementById('hibridoTimeline');
        if (!Timeline) return;

        if (Timeline.querySelector('.HibridoTimeline__Vacio')) {
            Timeline.innerHTML = '';
        }

        const Item = document.createElement('div');
        Item.className = 'HibridoTimeline__Item';
        Item.innerHTML = `
            <span class="HibridoTimeline__Badge HibridoTimeline__Badge--${Tipo}">${Badge}</span>
            <p class="HibridoTimeline__Texto">${Texto}</p>
        `;
        Timeline.appendChild(Item);
        Timeline.scrollTop = Timeline.scrollHeight;
    },

    Esperar(Ms) {
        return new Promise((Resolve) => setTimeout(Resolve, Ms));
    },

    async EjecutarFlujoEspectacular() {
        if (this.Ejecutando) return;

        const Btn = document.getElementById('btnFlujoHibridoSlide');
        const Metricas = document.getElementById('hibridoMetricas');
        const Paciente = this.Caso.Paciente || 'la paciente';
        this.Ejecutando = true;
        this.Resetear();

        document.getElementById('hibridoTimeline').innerHTML =
            '<p class="Placeholder HibridoTimeline__Vacio">Iniciando análisis híbrido…</p>';
        document.getElementById('hibridoVeredicto').innerHTML =
            '<p class="Placeholder">Procesando caso clínico…</p>';
        if (Metricas) Metricas.hidden = true;

        if (Btn) {
            Btn.disabled = true;
            Btn.textContent = '⏳ Analizando caso…';
        }

        try {
            const PromesaApi = ClienteApi.FlujoHibrido();

            this.ActivarNodo('entrada', `MRI de ${Paciente}`);
            this.AgregarLog(
                'Hospital',
                `${Paciente} — ${this.Caso.MotivoConsulta || 'estudio neurológico'}. Se envía ${this.Caso.Volumen || 'volumen MRI'}.`,
                'puente',
            );
            await this.Esperar(700);
            this.CompletarNodo('entrada');
            this.ActivarPuente(1);

            this.ActivarNodo('cnn', 'CNN-3D analizando volumen…');
            this.AgregarLog(
                'CNN',
                '👁 La CNN-3D recorre el volumen 3D. Su trabajo: localizar la lesión y medir confianza.',
                'cnn',
            );
            await this.Esperar(500);

            const Datos = await PromesaApi;
            const Cnn = Datos.Cnn || {};
            const CasoApi = Datos.Caso || this.Caso;

            this.CompletarNodo('cnn');
            this.ActivarNodo(
                'cnn',
                `${Cnn.TamanoLesion || '?'} ${Cnn.Unidad || ''} · ${Cnn.Confianza || '?'}%`,
            );
            this.AgregarLog(
                'CNN',
                `Detectó: <strong>${Cnn.Clase || 'Lesión'}</strong> de ${Cnn.TamanoLesion} ${Cnn.Unidad} en ${Cnn.Region} (${Cnn.Confianza}% confianza). Solo percibe — no decide tratamiento.`,
                'cnn',
            );
            await this.Esperar(700);
            this.ActivarPuente(2);

            this.ActivarNodo('hechos', 'Traduciendo a hechos…');
            const Legibles = Datos.HechosLegibles || [];
            this.CompletarNodo('hechos');
            this.ActivarNodo('hechos', `${Legibles.length} hecho(s) para el SE`);
            this.AgregarLog(
                'Puente',
                Datos.TraduccionCnn || `CNN → SE: ${Legibles.join('; ')}`,
                'puente',
            );
            await this.Esperar(700);
            this.ActivarPuente(3);

            const Inf = Datos.Inferencia || {};
            this.ActivarNodo('se', 'SE evaluando reglas clínicas…');
            this.AgregarLog(
                'SE',
                '🧠 El Sistema Experto recibe los hallazgos de la CNN y aplica reglas del protocolo hospitalario.',
                'se',
            );
            await this.Esperar(600);

            const NumReglas = (Inf.ReglasActivadas || []).length;
            this.CompletarNodo('se');
            this.ActivarNodo('se', `${NumReglas} regla(s) activada(s)`);
            (Inf.ReglasActivadas || []).forEach((R) => {
                this.AgregarLog(R.Id, `${R.Nombre}: ${R.Conclusion}`, 'se');
            });
            await this.Esperar(500);
            this.ActivarPuente(4);

            this.ActivarNodo('veredicto', 'Decisión conjunta lista');
            this.CompletarNodo('veredicto');
            this.MostrarVeredicto(Datos, CasoApi);
            this.AgregarLog(
                'Híbrido',
                `🤝 <strong>Veredicto conjunto:</strong> la CNN encontró la lesión; el SE recomienda: ${Inf.ConclusionPrincipal}`,
                'oro',
            );

            document.getElementById('hibrido')?.classList.add('is-celebracion');
            document.getElementById('hibridoVeredictoPanel')?.classList.add('is-celebracion');
        } catch (Err) {
            document.getElementById('hibridoVeredicto').innerHTML =
                `<p class="Placeholder">Error: ${Err.message}</p>`;
            this.AgregarLog('Error', Err.message, 'puente');
        } finally {
            this.Ejecutando = false;
            if (Btn) {
                Btn.disabled = false;
                const Nombre = this.Caso.Paciente || 'el paciente';
                Btn.textContent = `⚡ Analizar caso de ${Nombre} con Django`;
            }
        }
    },

    MostrarVeredicto(Datos, Caso) {
        const Cnn = Datos.Cnn || {};
        const Inf = Datos.Inferencia || {};
        const Metricas = Datos.Metricas || {};
        const Contenedor = document.getElementById('hibridoVeredicto');
        const PanelMetricas = document.getElementById('hibridoMetricas');

        if (!Contenedor) return;

        const ReglasHtml = (Inf.ReglasActivadas || [])
            .map((R) => `<li><strong>${R.Id}</strong> — ${R.Conclusion}</li>`)
            .join('');

        Contenedor.innerHTML = `
            <div class="HibridoVeredicto__Contenido">
                <div class="HibridoVeredicto__Cnn">
                    <strong>👁 Aporte de la CNN-3D (percepción)</strong>
                    En ${Caso.Paciente || 'la paciente'} detectó <strong>${Cnn.Clase}</strong>:
                    lesión de ${Cnn.TamanoLesion} ${Cnn.Unidad} en ${Cnn.Region}
                    con ${Cnn.Confianza}% de confianza.
                </div>
                <div class="HibridoVeredicto__Se">
                    <strong>🧠 Aporte del Sistema Experto (decisión)</strong>
                    ${Inf.ConclusionPrincipal}
                    ${ReglasHtml ? `<ul style="margin:8px 0 0;padding-left:18px;font-size:0.85rem">${ReglasHtml}</ul>` : ''}
                </div>
                <div class="HibridoVeredicto__Conjunto">
                    <strong>🤝 Trabajo conjunto — diagnóstico híbrido</strong>
                    Sin la CNN no se vería la lesión en 3D; sin el SE no habría recomendación
                    clínica explicable. Ambos sistemas completan el caso.
                </div>
            </div>
        `;

        if (PanelMetricas) {
            PanelMetricas.hidden = false;
            document.getElementById('metricaConfianza').textContent = `${Cnn.Confianza ?? '—'}%`;
            document.getElementById('metricaReglas').textContent = (Inf.ReglasActivadas || []).length;
            document.getElementById('metricaTiempo').textContent = `${Metricas.TiempoRespuestaSegundos ?? '—'}s`;
        }

        if (typeof EvaluacionInteractivo !== 'undefined' && Metricas) {
            EvaluacionInteractivo.ActualizarMetricas(Metricas);
        }
    },
};

window.HibridoInteractivo = HibridoInteractivo;
