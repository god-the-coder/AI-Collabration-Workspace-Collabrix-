from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializers, UserResponseSerializer, LoginSerializers
from .services import AuthService
from rest_framework import status
from apps.accounts.models import SessionsModel
# from .services import ProfilePageService


class RegisterAPIView(APIView):
    
    authentication_classes = []
    permission_classes = []

    def post(self, request):  
        serializer = RegisterSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = AuthService.register_user(serializer.validated_data)

        return Response(
            {
                "message": "Account created successfully",
                "access": result["access"],
                "refresh": result["refresh"],
                "user": UserResponseSerializer(result["user"]).data
            },

            status=status.HTTP_201_CREATED,
        )
    


class LoginAPIView(APIView):
    
    authentication_classes = []
    permission_classes = []

    def post(self, request):
      try:  
        serializer = LoginSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data["password"]
        email = serializer.validated_data["email"]

        result = AuthService.login_user(email, password)

        session = AuthService.create_session(
            user=result,
            request=request
        )

        token = AuthService.generate_token(
           user=result, 
           session=session
        )


        return Response(
            {
                "message": "user logged in successfully",
                "access": token["access"],
                "refresh": token["refresh"],
                "user": UserResponseSerializer(result).data              
            },
            status=status.HTTP_200_OK,
        )
      
      except Exception as e:
         print(type(e))
         print(e)
         raise


 
