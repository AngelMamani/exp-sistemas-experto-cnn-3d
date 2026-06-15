"""
PaginaPrincipalView.py
Responsabilidad: renderizar la presentación web principal con contexto dinámico.
"""
from django.views.generic import TemplateView

from exposicion.contenido.ContenidoComparacion import ContenidoComparacion
from exposicion.contenido.ContenidoCnn3d import ContenidoCnn3d
from exposicion.contenido.ContenidoEvaluacion import ContenidoEvaluacion
from exposicion.contenido.ContenidoHibrido import ContenidoHibrido
from exposicion.contenido.ContenidoResumen import ContenidoResumen
from exposicion.contenido.ContenidoSistemaExperto import ContenidoSistemaExperto
from exposicion.contenido.RegistroDiapositivas import RegistroDiapositivas
from exposicion.services.ContenidoPresentacion import ContenidoPresentacion


class PaginaPrincipalView(TemplateView):
    template_name = "exposicion/PaginaPrincipal.html"

    def get_context_data(self, **kwargs):
        Contexto = super().get_context_data(**kwargs)
        Contexto["TituloPresentacion"] = "Evaluación de CNN-3D de Sistemas Expertos"
        Contexto["Institucion"] = "UNAMAD"
        Contexto["Curso"] = "Sistemas Expertos"
        Contexto["FechaExposicion"] = "15/06/2026"
        Contexto["Integrantes"] = [
            "MAMANI MAMANI ANGEL DAMIAN",
            "PANDURO SANGAMA GERMAS",
        ]
        Contexto["Diapositivas"] = RegistroDiapositivas.ObtenerParaNavegacion()
        Contexto["TotalDiapositivas"] = len(Contexto["Diapositivas"])
        Contexto["Comparacion"] = ContenidoComparacion.ObtenerComparacionTabla()
        Contexto["ComparacionCriterios"] = ContenidoComparacion.ObtenerCriterios()
        Contexto["ComparacionEscenarios"] = ContenidoComparacion.ObtenerEscenarios()
        Contexto["CasoHibrido"] = ContenidoHibrido.ObtenerCaso()
        Contexto["PasosHibrido"] = ContenidoHibrido.ObtenerPasosPipeline()
        Contexto["EvaluacionIntro"] = ContenidoEvaluacion.ObtenerIntro()
        Contexto["EvaluacionDimensiones"] = ContenidoEvaluacion.ObtenerDimensiones()
        Contexto["ResumenPilares"] = ContenidoResumen.ObtenerPilares()
        Contexto["ResumenMensaje"] = ContenidoResumen.ObtenerMensajeFinal()
        Contexto["DefinicionSe"] = ContenidoSistemaExperto.ObtenerDefinicion()
        Contexto["PuntosClaveSe"] = ContenidoSistemaExperto.ObtenerPuntosClave()
        Contexto["ComponentesSe"] = ContenidoSistemaExperto.ObtenerComponentes()
        Contexto["TiposInferenciaSe"] = ContenidoSistemaExperto.ObtenerTiposInferencia()
        Contexto["PasosFlujoSe"] = ContenidoSistemaExperto.ObtenerPasosFlujo()
        Contexto["CasoSe"] = ContenidoSistemaExperto.ObtenerCasoReal()
        Contexto["DefinicionCnn"] = ContenidoCnn3d.ObtenerDefinicion()
        Contexto["PuntosClaveCnn"] = ContenidoCnn3d.ObtenerPuntosClave()
        Contexto["PasosPipelineCnn"] = ContenidoCnn3d.ObtenerPasosPipeline()
        Contexto["Comparacion2d3d"] = ContenidoCnn3d.ObtenerComparacion2d3d()
        Contexto["CasosCnn"] = ContenidoCnn3d.ObtenerCasosReales()
        Contexto["PresentacionConfig"] = {
            "metricas": ContenidoPresentacion.ObtenerMetricasIniciales(),
            "total": Contexto["TotalDiapositivas"],
            "componentesSe": Contexto["ComponentesSe"],
            "pasosFlujoSe": Contexto["PasosFlujoSe"],
            "casoSe": Contexto["CasoSe"],
            "pasosPipelineCnn": Contexto["PasosPipelineCnn"],
            "casosCnn": Contexto["CasosCnn"],
            "comparacionCriterios": Contexto["ComparacionCriterios"],
            "comparacionEscenarios": Contexto["ComparacionEscenarios"],
            "casoHibrido": Contexto["CasoHibrido"],
            "evaluacionDimensiones": Contexto["EvaluacionDimensiones"],
        }
        return Contexto
