from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        print("\n===== COOKIE AUTH DEBUG =====")
        print("PATH:", request.path)
        print("COOKIES RECEIVED:", request.COOKIES)

        raw_token = request.COOKIES.get("access_token")

        print("ACCESS TOKEN EXISTS:", raw_token is not None)

        if raw_token is None:
            print("❌ ACCESS TOKEN NOT RECEIVED")
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            print("✅ TOKEN VALIDATED")
        except Exception as e:
            print("❌ TOKEN VALIDATION FAILED")
            print(type(e))
            print(e)
            raise

        try:
            user = self.get_user(validated_token)
            print("✅ USER FOUND:", user)
            print("USER ID:", user.id)
        except Exception as e:
            print("❌ USER LOOKUP FAILED")
            print(type(e))
            print(e)
            raise

        return user, validated_token