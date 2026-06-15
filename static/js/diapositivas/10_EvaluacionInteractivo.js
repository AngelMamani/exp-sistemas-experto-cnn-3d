/**
 * 10_EvaluacionInteractivo.js — Diapositiva 10: evaluación dinámica por dimensiones.
 */
const EvaluacionInteractivo = {
    Dimensiones: [],
    DimensionActiva: 'cnn',
    GraficosListos: false,

    Inicializar() {
        this.Dimensiones = window.PRESENTACION?.evaluacionDimensiones || [];
        this.InicializarTarjetas();
        this.InicializarTeclado();

        window.addEventListener('slidechange', (E) => {
            if (E.detail.id === 'evaluacion') {
                if (!this.GraficosListos) {
                    GraficosEvaluacion.Inicializar(window.PRESENTACION?.metricas);
                    this.GraficosListos = true;
                    this.ActualizarKpis(window.PRESENTACION?.metricas);
                    this.ActualizarTiempoHibrido(window.PRESENTACION?.metricas);
                }
                if (this.DimensionActiva === 'se') this.RenderizarBarrasSe();
                if (this.DimensionActiva === 'hibrido') this.AnimarStatsHibrido();
            }
        });

        if (this.Dimensiones[0]) {
            this.MostrarDimension(this.Dimensiones[0].Id, false);
        }
    },

    InicializarTarjetas() {
        document.querySelectorAll('.EvalCard[data-eval-id]').forEach((Tarjeta) => {
            Tarjeta.addEventListener('click', () => {
                this.MostrarDimension(Tarjeta.dataset.evalId);
            });
        });
    },

    InicializarTeclado() {
        document.addEventListener('keydown', (E) => {
            const Slide = document.getElementById('evaluacion');
            if (!Slide?.classList.contains('is-active')) return;
            const Mapa = { '1': 'cnn', '2': 'se', '3': 'hibrido' };
            if (Mapa[E.key]) {
                E.preventDefault();
                this.MostrarDimension(Mapa[E.key]);
            }
        });
    },

    MostrarDimension(Id, Animar = true) {
        const Dim = this.Dimensiones.find((D) => D.Id === Id);
        if (!Dim) return;

        this.DimensionActiva = Id;

        document.querySelectorAll('.EvalCard[data-eval-id]').forEach((T) => {
            const Activa = T.dataset.evalId === Id;
            T.classList.toggle('is-activa', Activa);
            T.setAttribute('aria-pressed', Activa ? 'true' : 'false');
        });

        const Grid = document.getElementById('evalGrid');
        if (Grid) Grid.dataset.dimensionActiva = Id;

        const Inner = document.getElementById('evalDetalleInner');
        if (Inner && Animar) {
            Inner.classList.add('is-cambiando');
            setTimeout(() => {
                this.ActualizarDetalle(Dim);
                Inner.classList.remove('is-cambiando');
            }, 150);
        } else {
            this.ActualizarDetalle(Dim);
        }

        const Badges = {
            cnn: { texto: 'Métricas técnicas', clase: 'EvalBadge--Cnn' },
            se: { texto: 'Lógica y dominio', clase: 'EvalBadge--Se' },
            hibrido: { texto: 'Fin a fin', clase: 'EvalBadge--Hibrido' },
        };
        const Badge = document.getElementById('evalBadge');
        if (Badge) {
            const B = Badges[Id] || Badges.cnn;
            Badge.textContent = B.texto;
            Badge.className = `EvalBadge ${B.clase}`;
        }

        const TitulosGrafico = {
            cnn: '📊 Métricas CNN (Django)',
            se: '🧠 Evaluación lógica del SE',
            hibrido: '⚡ Sistema híbrido — fin a fin',
        };
        const TituloG = document.getElementById('evalGraficosTitulo');
        if (TituloG) TituloG.textContent = TitulosGrafico[Id] || '📊 Métricas';

        document.querySelectorAll('.EvalGraficoVista').forEach((V) => {
            V.classList.toggle('is-visible', V.dataset.vista === Id);
        });

        if (Id === 'se') this.RenderizarBarrasSe();
        if (Id === 'hibrido') this.AnimarStatsHibrido();
        if (Id === 'cnn' && this.GraficosListos) {
            GraficosEvaluacion.Actualizar(window.PRESENTACION?.metricas);
        }
    },

    ActualizarDetalle(Dim) {
        const Titulo = document.getElementById('evalDetalleTitulo');
        const Desc = document.getElementById('evalDetalleDesc');
        if (Titulo) Titulo.textContent = `${Dim.Icono} ${Dim.Titulo}`;
        if (Desc) Desc.textContent = Dim.Descripcion;

        const Lista = document.getElementById('evalCriterios');
        if (Lista) {
            Lista.innerHTML = (Dim.Criterios || []).map((C, I) => `
                <li class="EvalCriterio${I === 0 ? ' is-activo' : ''}" data-criterio-idx="${I}">
                    <span class="EvalCriterio__Nombre">${C.Nombre}</span>
                    <span class="EvalCriterio__Valor">${C.Valor}</span>
                    <p class="EvalCriterio__Detalle">${C.Detalle}</p>
                </li>
            `).join('');
            this.InicializarCriterios(Dim.Id);
        }

        const Ejemplo = document.getElementById('evalEjemplo');
        if (Ejemplo) {
            Ejemplo.innerHTML = `
                <span class="EvalEjemplo__Icono">💡</span>
                <div>
                    <strong>Ejemplo real del proyecto</strong>
                    <p>${Dim.Ejemplo}</p>
                </div>
            `;
        }
    },

    InicializarCriterios(DimensionId) {
        document.querySelectorAll('.EvalCriterio[data-criterio-idx]').forEach((Item) => {
            Item.addEventListener('click', () => {
                document.querySelectorAll('.EvalCriterio').forEach((C) => C.classList.remove('is-activo'));
                Item.classList.add('is-activo');
                const Idx = parseInt(Item.dataset.criterioIdx, 10);

                if (DimensionId === 'cnn') {
                    document.querySelectorAll('.EvalKpi').forEach((K, I) => {
                        K.classList.toggle('is-activo', I === Idx);
                    });
                    if (typeof GraficosEvaluacion !== 'undefined') {
                        GraficosEvaluacion.ResaltarBarra(Idx);
                    }
                }
                if (DimensionId === 'se') {
                    document.querySelectorAll('.EvalBarra').forEach((B, I) => {
                        B.classList.toggle('is-activa', I === Idx);
                    });
                }
            });
        });
    },

    RenderizarBarrasSe() {
        const Dim = this.Dimensiones.find((D) => D.Id === 'se');
        const Contenedor = document.getElementById('evalBarrasSe');
        if (!Dim || !Contenedor) return;

        Contenedor.innerHTML = (Dim.Criterios || []).map((C, I) => {
            const Pct = parseInt(C.Valor, 10) || 0;
            const Ancho = Pct > 0 ? `${Pct}%` : '85%';
            const Texto = Pct > 0 ? C.Valor : C.Valor;
            return `
                <div class="EvalBarra${I === 0 ? ' is-activa' : ''}" data-barra-idx="${I}">
                    <span class="EvalBarra__Label">${C.Nombre}</span>
                    <div class="EvalBarra__Track">
                        <div class="EvalBarra__Fill" data-ancho="${Ancho}" style="width:0"></div>
                    </div>
                    <span class="EvalBarra__Pct">${Texto}</span>
                </div>
            `;
        }).join('');

        requestAnimationFrame(() => {
            setTimeout(() => {
                Contenedor.querySelectorAll('.EvalBarra__Fill').forEach((Barra) => {
                    Barra.style.width = Barra.dataset.ancho || '0';
                });
            }, 80);
        });

        Contenedor.querySelectorAll('.EvalBarra').forEach((Barra) => {
            Barra.addEventListener('click', () => {
                const Idx = parseInt(Barra.dataset.barraIdx, 10);
                document.querySelectorAll('.EvalCriterio').forEach((C, I) => {
                    C.classList.toggle('is-activo', I === Idx);
                });
                document.querySelectorAll('.EvalBarra').forEach((B, I) => {
                    B.classList.toggle('is-activa', I === Idx);
                });
            });
        });
    },

    AnimarStatsHibrido() {
        document.querySelectorAll('.EvalHibridoStat__Num[data-target]').forEach((El) => {
            const Target = parseFloat(El.dataset.target);
            if (Number.isNaN(Target)) return;
            const EsTiempo = El.id === 'evalStatTiempo';
            const EsPct = El.textContent.includes('%');
            const EsRating = El.textContent.includes('/');

            let Inicio = 0;
            const Duracion = 800;
            const T0 = performance.now();

            const Tick = (Ahora) => {
                const Progreso = Math.min((Ahora - T0) / Duracion, 1);
                const Ease = 1 - (1 - Progreso) ** 3;
                const Valor = Inicio + (Target - Inicio) * Ease;

                if (EsTiempo) {
                    El.textContent = `${Valor.toFixed(1)}s`;
                } else if (EsRating) {
                    El.textContent = `${Valor.toFixed(1)}/5`;
                } else if (EsPct) {
                    El.textContent = `${Math.round(Valor)}%`;
                }
                if (Progreso < 1) requestAnimationFrame(Tick);
            };
            requestAnimationFrame(Tick);
        });
    },

    ActualizarKpis(Metricas) {
        if (!Metricas) return;
        const Valores = [
            Metricas.Precision,
            Metricas.Recall,
            Metricas.F1Score,
            Metricas.IoU,
        ];
        document.querySelectorAll('.EvalKpi__Val').forEach((El, I) => {
            if (Valores[I] != null) {
                El.textContent = `${Math.round(Valores[I] * 100)}%`;
            }
        });
    },

    ActualizarTiempoHibrido(Metricas) {
        const El = document.getElementById('evalStatTiempo');
        if (El && Metricas?.TiempoRespuestaSegundos) {
            El.dataset.target = Metricas.TiempoRespuestaSegundos;
            El.textContent = `${Metricas.TiempoRespuestaSegundos}s`;
        }
    },

    MostrarLive(Activo = true) {
        const Live = document.getElementById('evalLive');
        if (Live) Live.hidden = !Activo;
    },

    ActualizarMetricas(Metricas) {
        GraficosEvaluacion.Actualizar(Metricas);
        this.ActualizarKpis(Metricas);
        this.ActualizarTiempoHibrido(Metricas);
        this.MostrarLive(true);
        if (this.DimensionActiva === 'hibrido') this.AnimarStatsHibrido();
    },
};

window.EvaluacionInteractivo = EvaluacionInteractivo;
