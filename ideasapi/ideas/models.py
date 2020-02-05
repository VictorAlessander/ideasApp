from django.db import models

class Idea(models.Model):
  title = models.CharField(max_length=30)
  description = models.CharField(max_length=200)
  viability = models.IntegerField()
  situation = models.IntegerField()
  owner = models.CharField(max_length=30, blank=True)
  identification_date = models.DateTimeField(null=False, blank=False)
  conclusion_date = models.DateTimeField(null=True, blank=True)

  def __str__(self):
    return self.title