/**
 * GraficosEvaluacion.js — Chart.js con datos dinámicos de Django
 */
const GraficosEvaluacion = {
    ChartMetricas: null,
    ChartConfusion: null,

    Inicializar(MetricasIniciales) {
        const M = MetricasIniciales || window.PRESENTACION?.metricas || {};
        const CanvasM = document.getElementById('graficoMetricas');
        const CanvasC = document.getElementById('graficoConfusion');
        if (!CanvasM || !CanvasC || typeof Chart === 'undefined') return;

        const ColorTexto = '#94a3b8';
        const ColorGrid = 'rgba(255,255,255,0.05)';

        this.ChartMetricas = new Chart(CanvasM, {
            type: 'bar',
            data: {
                labels: ['Precision', 'Recall', 'F1-Score', 'IoU'],
                datasets: [{
                    label: 'CNN-3D',
                    data: [M.Precision || 0.91, M.Recall || 0.88, M.F1Score || 0.89, M.IoU || 0.76],
                    backgroundColor: ['#6366f1', '#38bdf8', '#34d399', '#fbbf24'],
                    borderRadius: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 1, ticks: { color: ColorTexto }, grid: { color: ColorGrid } },
                    x: { ticks: { color: ColorTexto }, grid: { display: false } },
                },
            },
        });

        const Matriz = M.MatrizConfusion || {};
        this.ChartConfusion = new Chart(CanvasC, {
            type: 'doughnut',
            data: {
                labels: ['VP', 'VN', 'FP', 'FN'],
                datasets: [{
                    data: [
                        Matriz.VerdaderoPositivo || 44,
                        Matriz.VerdaderoNegativo || 145,
                        Matriz.FalsoPositivo || 5,
                        Matriz.FalsoNegativo || 6,
                    ],
                    backgroundColor: ['#34d399', '#6366f1', '#fbbf24', '#f87171'],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: ColorTexto, padding: 16 } } },
            },
        });
    },

    Actualizar(Metricas) {
        if (!Metricas) return;
        if (this.ChartMetricas) {
            this.ChartMetricas.data.datasets[0].data = [
                Metricas.Precision, Metricas.Recall, Metricas.F1Score, Metricas.IoU,
            ];
            this.ChartMetricas.update('active');
        }
        if (this.ChartConfusion && Metricas.MatrizConfusion) {
            const M = Metricas.MatrizConfusion;
            this.ChartConfusion.data.datasets[0].data = [
                M.VerdaderoPositivo, M.VerdaderoNegativo, M.FalsoPositivo, M.FalsoNegativo,
            ];
            this.ChartConfusion.update('active');
        }
    },

    ResaltarBarra(Indice) {
        if (!this.ChartMetricas) return;
        const ColoresBase = ['#6366f1', '#38bdf8', '#34d399', '#fbbf24'];
        const ColoresDim = ColoresBase.map((C, I) =>
            I === Indice ? C : `${C}44`
        );
        this.ChartMetricas.data.datasets[0].backgroundColor = ColoresDim;
        this.ChartMetricas.update('none');
    },
};

window.GraficosEvaluacion = GraficosEvaluacion;
