from rest_framework import serializers
from .models import Idea


class IdeaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Idea
    fields = [
      'id',
      'title',
      'description',
      'viability',
      'situation',
      'owner',
      'identification_date',
      'conclusion_date'
    ]