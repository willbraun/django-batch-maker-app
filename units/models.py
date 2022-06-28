from django.db import models

# Create your models here.
class Unit(models.Model):
    SYSTEMS = ['I', 'M']
    
    singular_name = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=255)
    system = models.CharField(max_length=1, choices=SYSTEMS)
    dimension = models.CharField()
    