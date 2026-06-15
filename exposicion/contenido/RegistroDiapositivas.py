"""
RegistroDiapositivas.py
Responsabilidad: catálogo central — 1 diapositiva = 1 archivo HTML numerado.
"""


class RegistroDiapositivas:
    @staticmethod
    def ObtenerTodas():
        return [
            {"Numero": 1, "Indice": 0, "Id": "portada", "Titulo": "Portada",
             "Template": "exposicion/diapositivas/01_Portada.html"},
            {"Numero": 2, "Indice": 1, "Id": "sistema-experto", "Titulo": "SE — Concepto",
             "Template": "exposicion/diapositivas/02_SistemaExperto.html"},
            {"Numero": 3, "Indice": 2, "Id": "se-arquitectura", "Titulo": "SE — Arquitectura",
             "Template": "exposicion/diapositivas/03_SeArquitectura.html"},
            {"Numero": 4, "Indice": 3, "Id": "se-caso-mycin", "Titulo": "SE — Caso MYCIN",
             "Template": "exposicion/diapositivas/04_SeCasoMycin.html"},
            {"Numero": 5, "Indice": 4, "Id": "cnn-concepto", "Titulo": "CNN — Concepto",
             "Template": "exposicion/diapositivas/05_CnnConcepto.html"},
            {"Numero": 6, "Indice": 5, "Id": "cnn-pipeline", "Titulo": "CNN — Pipeline",
             "Template": "exposicion/diapositivas/06_CnnPipeline.html"},
            {"Numero": 7, "Indice": 6, "Id": "cnn-casos", "Titulo": "CNN — Casos reales",
             "Template": "exposicion/diapositivas/07_CnnCasos.html"},
            {"Numero": 8, "Indice": 7, "Id": "comparacion", "Titulo": "Comparación",
             "Template": "exposicion/diapositivas/08_Comparacion.html"},
            {"Numero": 9, "Indice": 8, "Id": "hibrido", "Titulo": "Sistema Híbrido",
             "Template": "exposicion/diapositivas/09_Hibrido.html"},
            {"Numero": 10, "Indice": 9, "Id": "evaluacion", "Titulo": "Evaluación",
             "Template": "exposicion/diapositivas/10_Evaluacion.html"},
            {"Numero": 11, "Indice": 10, "Id": "resumen", "Titulo": "Resumen",
             "Template": "exposicion/diapositivas/11_Resumen.html"},
        ]

    @staticmethod
    def ObtenerParaNavegacion():
        return [
            {"Id": D["Id"], "Titulo": D["Titulo"], "Numero": D["Numero"]}
            for D in RegistroDiapositivas.ObtenerTodas()
        ]
