from rest_framework import serializers
from apps.accounts.models import UserModel
from django.contrib.auth.password_validation import validate_password

class RegisterSerializers(serializers.Serializer):
    username = serializers.CharField(
        max_length = 255,
        min_length = 3
    )

    first_name = serializers.CharField(
        max_length = 255
    )

    last_name = serializers.CharField(
        max_length = 255
    )

    password = serializers.CharField(
        write_only = True,
        min_length = 8,
        trim_whitespace=False
    )

    email = serializers.EmailField(
        max_length = 255
    )

    confirm_password = serializers.CharField(
        write_only = True,
        trim_whitespace = False
    )

    def validate_username(self, value):
        if UserModel.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Please choose a unique username"
            )
        
        return value
    
    def validate_email(self, value):
        if UserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "User with this email already exist"
            )
        
        return value
    
    def validate_password(self, value):
        validate_password(value)
        return value
    
    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": "password do not match"
                }
            )
        return attrs
    


class UserResponseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserModel
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email"
        )



class LoginSerializers(serializers.Serializer):
    email = serializers.EmailField(
        max_length = 255
    )

    password = serializers.CharField(
        min_length=8,
        trim_whitespace=True,
        write_only=True
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError(
                "Email and Password are required."
            )
        
        return attrs

