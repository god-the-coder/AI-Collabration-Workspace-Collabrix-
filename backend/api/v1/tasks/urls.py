from django.urls import path

from api.v1.tasks.views import (
    CompleteTaskAPIView,
    DeleteTaskAPIView,
    CreateTaskAPIView,
    GlobalTaskAPIView,
    TaskDetailAPIView
)

app_name = "tasks"

urlpatterns = [
    # POST /api/v1/tasks/<task_id>/complete/
    path("<uuid:task_id>/complete/", CompleteTaskAPIView.as_view(), name="task-complete"),

    # DELETE /api/v1/tasks/<task_id>/
    path("<uuid:task_id>/", DeleteTaskAPIView.as_view(), name="task-delete"),

    path(
      "<uuid:workspace_id>/tasks/",
      CreateTaskAPIView.as_view(),
      name="create-task"
    ),

    
    path(
        "global_tasks/",
        GlobalTaskAPIView.as_view(),
        name="global_tasks",
    ),

    path(
        "detailed_task/<uuid:task_id>/",
        TaskDetailAPIView.as_view(),
        name="detailed_task_drawer"
    )

]
