from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('social-login/google/', GoogleLogin.as_view(), name='google_login'),
    path('giveid/', giveid.as_view()),
   
]