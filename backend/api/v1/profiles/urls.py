from django.urls import path
from .views import ProfilePageAPIView


urlpatterns = [
    path(
        "me/",
        ProfilePageAPIView.as_view()        
    )
]
