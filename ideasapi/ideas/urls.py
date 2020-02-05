from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ListCreateIdeas, RetrieveUpdateDestroyIdeas


urlpatterns = format_suffix_patterns([
  path('', ListCreateIdeas.as_view()),
  path('/<int:pk>', RetrieveUpdateDestroyIdeas.as_view())
])