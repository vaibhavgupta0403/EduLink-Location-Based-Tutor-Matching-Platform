from django.http.response import Http404
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework import generics,mixins
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import (
    LoginSerializer, RegisterSerializer, TokenSerializer)
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login,get_user_model,logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client



class BearerAuthentication(TokenAuthentication):
    keyword = 'Bearer'


User =get_user_model()


# when u get time read api guide generic views 

# token is only genrated for users not models



def create_auth_token(user):
    token1,_= Token.objects.get_or_create(user=user)
    #serializer=TokenSerializer(token1)
    #print(serializer.data)
    return token1.key



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    serializer_class = LoginSerializer
    print("please god")
    def post(self, request):
        print("please god")
        serializer = LoginSerializer(data=request.data)      
        if serializer.is_valid():
             #python data type not json
            login(request, serializer.validated_data['user'])
            x=create_auth_token(serializer.validated_data['user'])
            user=serializer.validated_data['user']
            return Response({'Token': x,'id':user.id},status=status.HTTP_200_OK)
        else:
            
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GoogleLogin(SocialLoginView):
    authentication_classes = [] # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/"
    client_class = OAuth2Client

class  giveid(APIView):
    def post(self, request, *args, **kwargs):
        token=request.data['token']
        user = Token.objects.get(key=token).user
        
        return Response({'id':user.id})


   




class LogoutView(APIView):

    authentication_classes = [BearerAuthentication,]
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        # simply delete the token to force a login
        #logout(request)
        request.user.auth_token.delete()
        return Response({'token':'nhimilega'}, status=status.HTTP_400_BAD_REQUEST)




class RegisterView(APIView):
    serializer_class_=RegisterSerializer
    def post(self, request,format=None):      
        ss = RegisterSerializer(data=request.POST)
        if ss.is_valid():
            ss.save()
            print(ss.instance)
            x=create_auth_token(ss.instance)    # need to explore
            return Response({'Token': x},status=status.HTTP_200_OK)
        else:
            return Response(ss.errors, status=status.HTTP_400_BAD_REQUEST)



'''
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


    def retrieve(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
'''



