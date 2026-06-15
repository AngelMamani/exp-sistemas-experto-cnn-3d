from django.urls import include, path

from exposicion.views.PaginaPrincipalView import PaginaPrincipalView

urlpatterns = [
    path("", PaginaPrincipalView.as_view(), name="inicio"),
    path("api/", include("exposicion.api.urls")),
]
