from django.contrib import admin
from .models import UserModel
from .models import SessionsModel 
from .models import UserSettingsModel as user_setti
from .models import EmailVerificationTokenModel as email_veri_token
from .models import PasswordResetTokenModel as pass_reset_token

# Register your models here.
admin.site.register(UserModel)
admin.site.register(SessionsModel)
admin.site.register(user_setti)
admin.site.register(pass_reset_token)
admin.site.register(email_veri_token)