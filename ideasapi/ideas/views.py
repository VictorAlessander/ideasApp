from django.shortcuts import render
from rest_framework import generics
from .models import Idea
from .serializers import IdeaSerializer


class ListCreateIdeas(generics.ListCreateAPIView):
  queryset = Idea.objects.all()
  serializer_class = IdeaSerializer


class RetrieveUpdateDestroyIdeas(generics.RetrieveUpdateDestroyAPIView):
  queryset = Idea.objects.all()
  serializer_class = IdeaSerializer