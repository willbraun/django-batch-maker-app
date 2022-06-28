from django.db import models

# Create your models here.
class Unit(models.Model):
    SYSTEMS = (
        ('I', 'Imperial',),
        ('M', 'Metric',)
    )
    
    singular_name = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=255)
    system = models.CharField(max_length=1, choices=SYSTEMS)
    
    def __str__(self):
        return self.singular_name