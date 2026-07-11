from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from common.utils.api_response import success_response
from apps.accounts.models import UserModel


class healthCheckView(APIView):
    def get(self, request):
        return success_response(message="API running")

class profileView(APIView):
    
    # permission_classes = [IsAuthenticated]

    def get(self, request):

        print(request.headers)
        user = UserModel.objects.get(username="sample")

        return Response({
            "user": str(user.id),
            "id": request.user.id
        })