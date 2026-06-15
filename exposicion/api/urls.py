from django.urls import path

from exposicion.api.InferenciaApi import AnalizarVolumenApi, FlujoHibridoApi, InferirApi

urlpatterns = [
    path("analizar-volumen/", AnalizarVolumenApi.as_view(), name="api_analizar"),
    path("inferir/", InferirApi.as_view(), name="api_inferir"),
    path("flujo-hibrido/", FlujoHibridoApi.as_view(), name="api_hibrido"),
]
