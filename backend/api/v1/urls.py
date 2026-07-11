from django.urls import path, include
from .views import healthCheckView, profileView


urlpatterns = [
    path(
        "health/", 
        healthCheckView.as_view()
    ),

    path(
        "profile/", 
        profileView.as_view()
    ),

    path(
        "auth/", 
        include("api.v1.accounts.urls")
    ),

    path(
        "workspaces/", 
        include("api.v1.workspaces.urls")
    ),

    path(
        "notifications/",
        include("api.v1.notifications.urls")
    ),

    path(
        "projects/",
        include("api.v1.projects.urls")
    ),

    path(
        "tasks/",
        include("api.v1.tasks.urls")         
    ),


    path(
        "profiles/",
        include("api.v1.profiles.urls")
    ),

    path(
        "settings/",
        include("api.v1.settings.urls")
    ),
]