from django.urls import path

from api.v1.tasks.views import (
    CompleteTaskAPIView,
    DeleteTaskAPIView,
)

app_name = "tasks"

urlpatterns = [
    # POST /api/v1/tasks/<task_id>/complete/
    path("<uuid:task_id>/complete/", CompleteTaskAPIView.as_view(), name="task-complete"),

    # DELETE /api/v1/tasks/<task_id>/
    path("<uuid:task_id>/", DeleteTaskAPIView.as_view(), name="task-delete"),
]
