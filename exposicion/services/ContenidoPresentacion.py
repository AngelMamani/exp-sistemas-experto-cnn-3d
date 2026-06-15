"""
ContenidoPresentacion.py
Responsabilidad: datos compartidos entre diapositivas (métricas, comparación).
"""


class ContenidoPresentacion:
    @staticmethod
    def ObtenerMetricasIniciales():
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

    @staticmethod
    def ObtenerComparacion():
        from exposicion.contenido.ContenidoComparacion import ContenidoComparacion
        return ContenidoComparacion.ObtenerComparacionTabla()
