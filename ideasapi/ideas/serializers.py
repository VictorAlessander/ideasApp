from rest_framework import serializers
from .models import Idea


class IdeaSerializer(serializers.ModelSerializer):

  # Override fields to camelcase and adjust datetime format
  identificationDate = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
  conclusionDate = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False, allow_null=True)

  class Meta:
    model = Idea
    fields = [
      'id',
      'title',
      'description',
      'viability',
      'situation',
      'owner',
      'identificationDate',
      'conclusionDate'
    ]