from django.urls import path
from .views import ProjectsListRetrieveAPIView

urlpatterns = [
    path(
        "list/",
        ProjectsListRetrieveAPIView.as_view()
    )
]
