from django.urls import path
from .views import healthCheckView, profileView


urlpatterns = [
    path("health/", healthCheckView.as_view()),
    path("profile/", profileView.as_view()),
]