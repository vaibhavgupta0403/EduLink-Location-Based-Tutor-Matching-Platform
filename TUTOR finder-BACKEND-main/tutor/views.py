import re
from django.http.response import Http404
from PIL import Image
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework import generics,mixins
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from .serializers import *
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login,get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from geopy.geocoders import Nominatim
from geopy.distance import great_circle
from collections import OrderedDict
from .models import *
from django.views.decorators.clickjacking import xframe_options_exempt

def create_auth_token(user):
    token1,_= Token.objects.get_or_create(user=user)
    #serializer=TokenSerializer(token1)
    #print(serializer.data)
    return token1.key


username='mathtutor4655@gmail.com'
password='tushar1234'

geolocator = Nominatim(user_agent="tutor")
x1=27.156200
y1=76.852100
usloca=(x1,y1)
obj_phy=get_object_or_404(sub,id=1)
obj_chem=get_object_or_404(sub,id=4)
obj_bio=get_object_or_404(sub,id=3)
obj_math=get_object_or_404(sub,id=2)
subject_dict={
    'maths':obj_math,
    'physics':obj_phy,
    'chemistry':obj_chem,
    'biology':obj_bio
}

User =get_user_model()
class BearerAuthentication(TokenAuthentication):
    keyword = 'Bearer'

# deserilizing saving an data instance by json request method
#it works as first deseriliaer converts json data to pyhton datatype 


                                                #no change needed
def send_mail(html=None,subject='you have successfully registered at my-tutor',from_email='mathtutor4655@gmail.com',to_emails=[],text=''):
    assert isinstance(to_emails,list)
    msg=MIMEMultipart('alternative')
    msg['From']=from_email
    msg['To']=", ".join(to_emails)
    msg['Subject']=subject
    txt_part=MIMEText(text,'plain')
    msg.attach(txt_part)
    html_part = MIMEText(f"<p>Here is your password reset token</p><h1>{html}</h1>", 'html')
    msg.attach(html_part)
    msg_str=msg.as_string()
    print("yoyo")
    server=smtplib.SMTP(host='smtp.gmail.com',port=587)
    server.ehlo()
    server.starttls()
    server.login(username,password)
    server.sendmail(from_email,to_emails,msg_str)
    server.quit()







                                #not yet done 
class macreateView(generics.GenericAPIView):

   # permission_classes = (permissions.IsAuthenticated,IsOwnerOrReadOnly)
    serializer_class = macreateserializer
    def post(self, request):
        username= request.data['username']
        password=request.data['password']
        first_name=request.data['first_name']
        email=request.data['email']
        istutor=request.data['istutor']
        if istutor=='no':
             registerserializer=RegisterSerializer(data=request.data,context={'username':username,'password':password,'first_name':first_name,'email':email})  
             if  registerserializer.is_valid():
                user=registerserializer.save()
                serializer=proxymacreate(data=request.data,context={'user': user,'subject':request.data['subject']})
                if serializer.is_valid():
                    serializer.save()
                    x=create_auth_token(user)
                    #send_mail(to_emails=user.email,text="thanks for registering"+user.first_name)
                    return Response({'Token': x},status=status.HTTP_200_OK)
                else:
                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


             else:
                 return Response(registerserializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            loginserializer=LoginSerializer(data=request.data,context={'username':username,'password':password})
            if loginserializer.is_valid():
                user=loginserializer.validated_data['user']
                subject=subject_dict[request.data['subject']]
                q1=mathtutor.objects.all().filter(subject=subject,matutor=user)
                if q1.count():
                     return Response({'response':'you already a tutor of this subject'},status=status.HTTP_409_CONFLICT)
                serializer=proxymacreate(data=request.data,context={'user': user,'subject':request.data['subject']})
                if serializer.is_valid():
                    serializer.save()
                    x=create_auth_token(user)
                    return Response({'Token': x},status=status.HTTP_200_OK)
                else:
                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



            else:
                 return Response(loginserializer.errors, status=status.HTTP_400_BAD_REQUEST)


class rateuser(generics.GenericAPIView):
    serializer_class= macreateserializer

    def post(self, request):
        matutor=get_object_or_404(mathtutor,id=request.data['tutorid'])
        print(matutor)
        user=get_object_or_404(User,id=request.data['userid'])
        rating=request.data['rating']
        print(matutor)
      
        q1=Userrating.objects.all().filter(matutor=matutor,user=user)
        if q1.count():
            for obj in q1.iterator():
                obj.ratingbyuser=rating
                obj.save()
        else:
            Userrating.objects.create(matutor=matutor,user=user,ratingbyuser=rating)
        q1=Userrating.objects.all().filter(matutor=matutor)
        rat=0
        cnt=0
        for obj in q1.iterator():
            rat+=obj.ratingbyuser
            cnt+=1
        rat/=cnt
        serializer=macreateserializer(matutor,data={'rating':rat},partial=True)

        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data,status=status.HTTP_200_OK)
        else:
           return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



            








            


            


            




     
       










# preety fine 
class malistView(generics.GenericAPIView):
    authentication_classes = [BearerAuthentication,]
    permission_classes = (permissions.IsAuthenticated,)
    # one parameter i am taking throug form is the distance upto which user wants to serarch tutors
    serializer_class = macreateserializer
    def post(self, request): 
        apr=request.data['range']
        ap=request.user
        apr=int(apr)
        subject=request.data['subject']
        obj1='nnjn'
        if subject=='maths':
            obj1=obj_math
        if subject=='physics':
            obj1=obj_phy
        if subject=='chemistry':
            obj1=obj_chem
        if subject=='biology':
            obj1=obj_bio

        q1=mathtutor.objects.all().filter(subject=obj1)
        dict={} 
        dict1={}
        dict2={}
        cnt=1     
        x1=request.data['x1']
        y1=request.data['y1']
        print(x1)
        print(y1)
        usloca=(x1,y1)
        for obj in q1.iterator():    
            lat=obj.lati
            lon=obj.longi
            loca=(lat,lon)
            x3=great_circle(loca,usloca).km
            dict[cnt]=x3
            dict1[cnt]=obj.matutor.first_name
            dict2[cnt]=obj.id
            cnt+=1
        serializer=self.get_serializer(q1,many=True)
        q2=serializer.data
        q3=[]
        cnt=0

        for x in q2:
            cnt+=1
            ch=0
            for y in x:
                if y=="distance":
                    x[y]=dict[cnt]
                    if dict[cnt] <= apr:
                        x['matutor']=dict1[cnt]
                        ch=1
            if ch==1:
                x['id']=dict2[cnt]
                q3.append(x)
        print(q3)
        return Response(q3,status=status.HTTP_200_OK)




class matutorlogin(generics.GenericAPIView):
    serializer_class =  MatutorLoginSerializer
    print("please god")
    def post(self, request):
        print("please god")
        serializer =  MatutorLoginSerializer(data=request.data)      
        if serializer.is_valid():
             #python data type not json
            login(request, serializer.validated_data['user'])
            x=create_auth_token(serializer.validated_data['user'])
            return Response({'Token': x},status=status.HTTP_200_OK)
        else:
            
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class matutordashboard(generics.GenericAPIView):
    authentication_classes = [BearerAuthentication,]
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = macreateserializer
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    

    def post(self,request):
        tutor_subject= request.data['sub']
        print(request.data)
        tutor_subject=subject_dict[tutor_subject]
        tutor=request.user
        q1=mathtutor.objects.all().filter(subject=tutor_subject,matutor=tutor)
        dict={}
        dict1={}
        cnt=0
        for obj in q1.iterator():  
            dict[cnt]=obj.matutor.first_name
            dict1[cnt]=obj.id
            cnt+=1
        serializer=self.get_serializer(q1,many=True)
        q2=serializer.data
        # list of dict of objects
        q3=[]
        cnt=0
        for x in q2:
             x['matutor']=dict[cnt]
             x['subject']=request.data['sub']
             x['id']=dict1[cnt]
             q3.append(x)
             break
        return Response(q3,status=status.HTTP_200_OK)

    def put(self, request):
        feild= request.data['feild']
        if(feild=='name'):
             obj=get_object_or_404(mathtutor,id=request.data['id'])
             user=obj.matutor
             serializer= Userserilizer(user,data={'first_name':request.data['value']},partial=True)
             if serializer.is_valid():
               x=serializer.save()
               return Response(serializer.data,status=status.HTTP_200_OK)
             else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        obj=get_object_or_404(mathtutor,id=request.data['id'])
        value=request.data['value']
        serializer=self.get_serializer(obj,data={feild:value}, partial=True)
        if serializer.is_valid():
             x=serializer.save()
             return Response(serializer.data,status=status.HTTP_200_OK)
        else:
           return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Tutorimage(generics.GenericAPIView):
    authentication_classes = [BearerAuthentication,]
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = macreateserializer
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    def put(self,request):
        obj=get_object_or_404(mathtutor,id=request.data['id'])
        serializer=self.get_serializer(obj,data={'img':request.data['img']},partial=True)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data,status=status.HTTP_200_OK) 
        else:
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        

       
        
                    
         
        
        






























        
                          #some work still remains to be done
                      
class UserProfileView(generics.GenericAPIView):
    serializer_class= macreateserializer
    def get(self,request,id):
        userr=get_object_or_404(mathtutor,id=id)
        q2=userr.matutor.first_name
        print(userr)
        serializer= self.get_serializer(userr)
        print(serializer)
        #q2=serializer.matutor.first_name
        q1=serializer.data
        q1['matutor']=q2
        return Response(q1,status=status.HTTP_200_OK)



            

            







        




       