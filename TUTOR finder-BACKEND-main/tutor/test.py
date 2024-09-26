        user=authenticate(username=username,password=password)
        if user is not None:
             x=create_auth_token(user)
             subject=request.data['subject']
             q1=mathtutor.objects.all().filter(subject=subject,matutor=user)
             if q1.count():
                 return Response({'response':'you already a tutor of this subject'},status=status.HTTP_409_CONFLICT)
             else:
                 serializer=macreateserializer(data=request.data,context={'user': user})
                 if serializer.is_valid():
                     serializer.save()
                     return Response(serializer.data,status=status.HTTP_200_OK)
                 else:
                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
