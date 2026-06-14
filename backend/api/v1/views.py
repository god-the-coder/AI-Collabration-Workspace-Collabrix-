from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from common.utils.api_response import success_response


class healthCheckView(APIView):
    def get(self, request):
        return success_response(message="API running")

class profileView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request):

        print(request.headers)

        return Response({
            "user": request.user.username
        })