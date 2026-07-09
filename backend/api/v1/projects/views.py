from rest_framework.views import APIView
from .services import ProjectsListService
from .serializers import ProjectListSerializer
from rest_framework.response import Response


class ProjectsListRetrieveAPIView(APIView):
    

    def get(self, request):
     try: 
        result = ProjectsListService.get_projects_data(request.user)

        serializer = ProjectListSerializer(
            result["projects"],
            many=True
        )

        return Response({
            "summary": result["summary"],
            "projects": serializer.data
        })
     except Exception as e:
        print(type(e))
        print(e)
        raise
    