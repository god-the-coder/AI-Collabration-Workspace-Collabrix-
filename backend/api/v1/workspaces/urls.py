from django.urls import path 
from .views import WorskspacesListAPIView

urlpatterns = [
    path(
        "list/",
        WorskspacesListAPIView.as_view(),
        name="all_user_workspaces"
    )
]
