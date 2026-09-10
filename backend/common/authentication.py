from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        print("\n===== COOKIE AUTH DEBUG =====")
        print("PATH:", request.path)
        print("COOKIES RECEIVED:", request.COOKIES)

        raw_token = request.COOKIES.get("access_token")

        print("ACCESS TOKEN EXISTS:", raw_token is not None)

        if raw_token is None:
            print("ACCESS TOKEN NOT RECEIVED")
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            print("TOKEN VALIDATED")
        except Exception as e:
            print("TOKEN VALIDATION FAILED")
            print(type(e))
            print(e)
            raise

        session_id = validated_token.get("session_id")

        if session_id:
            from apps.accounts.models import SessionsModel

            session_is_active = SessionsModel.objects.filter(
                id=session_id,
                revoked_at__isnull=True,
            ).exists()

            if not session_is_active:
                print("SESSION REVOKED")
                raise InvalidToken("Session has been revoked.")

        try:
            user = self.get_user(validated_token)
            print("USER FOUND:", user)
            print("USER ID:", user.id)
        except Exception as e:
            print("USER LOOKUP FAILED")
            print(type(e))
            print(e)
            raise

        return user, validated_token