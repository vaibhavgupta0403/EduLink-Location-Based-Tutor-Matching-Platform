from rest_framework import serializers
from django.contrib.auth import authenticate,get_user_model
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



User =get_user_model()

#  serilaizers -
#  can help in validation proceess means you dont have to do it mannualy 
# can help in converting json files to object instances to create update or delete any onbject
# can help in converting object instance and querysets to json objects
#this works donts needs any overriding of funtion in serlizer classes




class TokenSerializer(serializers.ModelSerializer):
    token=serializers.CharField(max_length=200)
    class Meta:
        model = Token
        fields=['key']
   
    

    # if u use model serilizers u dont need to run validations mannunally as it directly map feilds to model feils but
    # in case of normal serializers u have to run validation mannuly 
    # model serilizers include basic implementations of create and update funtions inbulit 
    # but not in case of normal serializers


class LoginSerializer(serializers.Serializer):
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
            if user is None:               
                 raise serializers.ValidationError("Invalid Credentials")
            else:
                data['user']=user
                return data

 

    


class RegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['username', 'password','first_name','email']

    def create(self, validated_data):        # this funtion returned data appers in serilizer.data
        user=User.objects.create_user(**validated_data)
        print(user)
        return user



  


    
    