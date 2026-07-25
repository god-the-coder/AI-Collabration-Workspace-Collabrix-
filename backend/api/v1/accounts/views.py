from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializers, UserResponseSerializer, LoginSerializers
from .services import AuthService
from rest_framework import status
from apps.accounts.models import SessionsModel
from config.settings import base
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


        response =  Response(
            {
                "message": "user logged in successfully",
                "access": token["access"],
                "refresh": token["refresh"],
                "user": UserResponseSerializer(result).data              
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
           key="access_token",
           value=token["access"],
           httponly=True,
           secure=True,
           samesite='Lax',
           max_age=base.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(),
        )

        response.set_cookie(
           key="refresh_token",
           value=token["refresh"],
           httponly=True,
           secure=False,
           samesite="Lax",
           max_age=base.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()
        )

        return response

    
      
      except Exception as e:
         print(type(e))
         print(e)
         raise


 
