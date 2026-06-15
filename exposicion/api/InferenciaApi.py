"""
InferenciaApi.py
Responsabilidad: endpoints JSON para demo híbrida e inferencia manual.
"""
import json

from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from exposicion.contenido.ContenidoHibrido import ContenidoHibrido
from exposicion.services.MotorInferencia import MotorInferencia
from exposicion.services.SimuladorCnn import SimuladorCnn


@method_decorator(csrf_exempt, name="dispatch")
class AnalizarVolumenApi(View):
    def post(self, request):
        try:
            Cuerpo = json.loads(request.body or "{}")
        except json.JSONDecodeError:
            Cuerpo = {}

        CasoId = Cuerpo.get("CasoId")
        Resultado = SimuladorCnn().AnalizarVolumen(CasoId)
        Metricas = SimuladorCnn().ObtenerMetricasEvaluacion()
        return JsonResponse({"Cnn": Resultado, "Metricas": Metricas})


@method_decorator(csrf_exempt, name="dispatch")
class InferirApi(View):
    def post(self, request):
        try:
            Cuerpo = json.loads(request.body or "{}")
        except json.JSONDecodeError:
            return JsonResponse({"Error": "JSON inválido"}, status=400)

        Hechos = {
            "Fiebre": bool(Cuerpo.get("Fiebre", False)),
            "Tos": bool(Cuerpo.get("Tos", False)),
            "DolorToracico": bool(Cuerpo.get("DolorToracico", False)),
            "OpacidadImagen": bool(Cuerpo.get("OpacidadImagen", False)),
            "LesionGrande": bool(Cuerpo.get("LesionGrande", False)),
            "RegionCritica": bool(Cuerpo.get("RegionCritica", False)),
            "ConfianzaAlta": bool(Cuerpo.get("ConfianzaAlta", False)),
        }

        Resultado = MotorInferencia().Inferir(Hechos)
        return JsonResponse(Resultado)


@method_decorator(csrf_exempt, name="dispatch")
class FlujoHibridoApi(View):
    def post(self, request):
        Simulador = SimuladorCnn()
        Motor = MotorInferencia()
        Caso = ContenidoHibrido.ObtenerCaso()

        Cnn = Simulador.AnalizarVolumen(Caso["Id"])
        Metricas = Simulador.ObtenerMetricasEvaluacion()
        Hechos = Motor.HechosDesdeCnn(Cnn)
        Inferencia = Motor.Inferir(Hechos)

        return JsonResponse(
            {
                "Caso": Caso,
                "Cnn": Cnn,
                "Metricas": Metricas,
                "Hechos": Hechos,
                "HechosLegibles": ContenidoHibrido.ObtenerHechosLegibles(Hechos),
                "TraduccionCnn": ContenidoHibrido.ObtenerTraduccionCnn(Hechos),
                "Inferencia": Inferencia,
            }
        )
