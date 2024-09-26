from django.urls import path
from .views import *

urlpatterns = [
    path('matutor/register', macreateView.as_view()),
    path('matutor/list',malistView.as_view()),
    path('matutor/userpro/<int:id>/',UserProfileView.as_view()),
    path('matutor/login',matutorlogin.as_view()),
    path('matutor/dashboard',matutordashboard.as_view()),
    path('matutor/imageupdate', Tutorimage.as_view()),
    path('matutor/rateuser',rateuser.as_view()),
    
    
    
    
 

]