from rest_framework import serializers
from django.contrib.auth import authenticate,get_user_model
from django.contrib.auth.models import User
from .models import *
from django.shortcuts import get_object_or_404
User=get_user_model()

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

class Userserilizer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'


class RegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['username', 'password','first_name','email']



    def save(self): 
        username=self.context['username']
        password=self.context['password']
        first_name=self.context['first_name']
        email=self.context['email']
        user=User.objects.create_user(username,email,password)
        user.first_name=first_name
        user.save()
        return user
    





class macreateserializer(serializers.ModelSerializer):

    class Meta:
        model=mathtutor
        fields=('matutor','contact_no','address','aboutyou','img','doc','dis','distance','rating')
    '''def save(self, **kwargs):
        data = self.validated_data
        user = self.context['request'].user
        title = data['title']
        todo = Todo.objects.create(creator=user, title=title)
        return todo'''

    def validate(self,data):
        return data

    def create(self,validated_data): 
         data =self.validated_data
         user=self.context['user']
         print(data)
         masstar = mathtutor.objects.create(matutor=user,contact_no=data['contact_no'], address=data['address'],aboutyou=data['aboutyou'],img=data['img'],doc=data['doc'],lati=data['lati'],longi=data['longi'],subject=data['subject'],)
         return masstar

        
class proxymacreate(serializers.ModelSerializer):
     class Meta:
        model=mathtutor
        fields=('contact_no','address','aboutyou','img','doc','lati','longi',)

     def validate(self,data):
        return data
     def create(self,validated_data): 
         data =self.validated_data
         user=self.context['user']
         print(data)
         sub=subject_dict[self.context['subject']]
         masstar = mathtutor.objects.create(matutor=user,contact_no=data['contact_no'], address=data['address'],aboutyou=data['aboutyou'],img=data['img'],doc=data['doc'],lati=data['lati'],longi=data['longi'],subject=sub,)
         return masstar





class MatutorLoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username', 'password',]

    #  this funtion workks when you hit .is_valid() function
    def validate(self,data):
        username=data.get('username')
        password=data.get('password') 
       # this funtion returned data appers in validated_data
        if username and password:
            user=authenticate(username=username,password=password)
            # now task is that is this user a matutor or not
            query=mathtutor.objects.all().filter(matutor=user)
            if user is None:               
                 raise serializers.ValidationError("Invalid Credentials")
            if query.count()==0:
                 raise serializers.ValidationError("you are not a tutor at our site please register yourself as an tutor")
            data['user']=user
            return data
        else:
            raise serializers.ValidationError("Incomplete Credentials")


class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username', 'password',]

    #  this funtion workks when you hit .is_valid() function
    def validate(self,data):
        username=self.context.get('username')
        password=self.context.get('password') 
       # this funtion returned data appers in validated_data
        if username and password:
            user=authenticate(username=username,password=password)
            if user is None:               
                 raise serializers.ValidationError("Invalid Credentials")
            else:
                data['user']=user
                return data

 