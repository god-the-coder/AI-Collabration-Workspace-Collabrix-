from django.db import transaction
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from apps.accounts.models import UserModel, SessionsModel
# from django.contrib.auth import hashers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from apps.accounts.models import UserModel



class AuthService:

    @staticmethod
    @transaction.atomic
    def register_user(validated_data):

        validated_data.pop("confirm_password")
        password = validated_data.pop("password")

        user = UserModel(**validated_data)
        user.set_password(password)

        user.save()

        return {
            "user": user,
            # "access": str(refresh.access_token),
            # "refresh": str(refresh)
        }
    

    @staticmethod
    def login_user(email, password):
        user = authenticate(
            email=email,
            password=password
        )

        if user is None:
            raise AuthenticationFailed(
                "Invalid user or password"
            )
        
        elif not user.is_active:
            raise AuthenticationFailed(
                "Your account has been deactivated"
            )
        
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        return user

    
    @staticmethod
    def generate_token(user, session):

        refresh = RefreshToken.for_user(user)

        refresh["session_id"] = str(session.id)
        session.refresh_token = str(refresh)
        session.save(update_fields=["refresh_token"])
        

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }
    
    @staticmethod
    def create_session(user, request):

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        
        if x_forwarded_for:
            ip_address = x_forwarded_for.split[','][0].strip()
        else:
            ip_address = request.META.get('REMOTE_ADDR')

        session = SessionsModel.objects.create(
            user=user,
            ip_address=ip_address,
            user_agent=request.META.get('HTTP_USER_AGENT'),
            expires_at=timezone.now() + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]
        )

        return session

