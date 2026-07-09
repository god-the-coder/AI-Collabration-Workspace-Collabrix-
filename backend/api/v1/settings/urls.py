from django.urls import path
from .views import SettingsAPIView, SettingsProfileAPIView, SettingsAppearanceAPIView, SettingsNotificationAPIView, SettingsPasswordAPIView, SettingsDeleteAPIView, SettingsRevokeAllAPIView

urlpatterns = [
    path(
        "me/",
        SettingsAPIView.as_view()
    ),

    path(
        "profile/",
        SettingsProfileAPIView.as_view()
    ),

    path(
        "appearance/",
        SettingsAppearanceAPIView.as_view()
    ),

    path(
        "notification/",
        SettingsNotificationAPIView.as_view()
    ),

    path(
        "password/",
        SettingsPasswordAPIView.as_view()
    ),

    path(
        "delete/",
        SettingsDeleteAPIView.as_view()        
    ),

    path(
        "all-logout/",
        SettingsRevokeAllAPIView.as_view()
    ),

    
]
