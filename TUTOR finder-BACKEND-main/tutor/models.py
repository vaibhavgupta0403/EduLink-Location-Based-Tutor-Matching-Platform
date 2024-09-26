from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth import authenticate,get_user_model

User =get_user_model()
class sub(models.Model):
    name=models.CharField(max_length=100,blank=True)
    def __str__(self):
        return self.name



class mathtutor(models.Model):
    matutor=models.ForeignKey(User,on_delete=models.CASCADE)
    contact_no=PhoneNumberField()
    address=models.TextField(blank=True)
    aboutyou=models.TextField(blank=True)
    img=models.ImageField(upload_to='upload/', height_field=None, width_field=None, max_length=100,default='SOME stirng')
    doc=models.FileField(upload_to='upload/',default='SOME string')
    dis=models.BooleanField(default=True)
    distance=models.FloatField(default=0.0)
    lati=models.FloatField(default=0.0)
    longi=models.FloatField(default=0.0)
    subject=models.ForeignKey(sub,on_delete=models.CASCADE,blank=True,default='some string')
    rating=models.FloatField(default=0.0)
    
   
    
class Userrating(models.Model):
     matutor = models.ForeignKey(mathtutor, on_delete=models.CASCADE)
     user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE )
     ratingbyuser = models.FloatField(default=0.0)




