"""
SimuladorCnn.py
Responsabilidad: simular detección CNN-3D y métricas de evaluación técnica.
"""
from exposicion.contenido.ContenidoCnn3d import ContenidoCnn3d


class SimuladorCnn:
    def AnalizarVolumen(self, CasoId=None):
        return ContenidoCnn3d.ObtenerSalidaCnnPorCaso(CasoId)

    def ObtenerMetricasEvaluacion(self):
        return {
            "Precision": 0.91,
            "Recall": 0.88,
            "F1Score": 0.89,
            "IoU": 0.76,
            "MatrizConfusion": {
                "VerdaderoPositivo": 44,
                "FalsoPositivo": 5,
                "FalsoNegativo": 6,
                "VerdaderoNegativo": 145,
            },
            "TiempoRespuestaSegundos": 12.4,
        }
