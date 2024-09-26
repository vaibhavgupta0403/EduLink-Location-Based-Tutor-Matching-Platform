from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import myuser

admin.site.register(myuser, UserAdmin)