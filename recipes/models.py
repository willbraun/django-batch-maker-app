from distutils.command.upload import upload
from django.db import models
from django.conf import settings
from .models import Unit

# Create your models here.

class Recipe(models.Model):
    TYPES = ['BR','LU','DI','DE']
    
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    image = models.ImageField(upload_to='recipes/images/')
    public = models.BooleanField()
    recipe_type = models.CharField(max_length=2, choices=TYPES)
    prep_time = models.PositiveIntegerField()
    cook_time = models.PositiveIntegerField()
    cook_temp = models.PositiveIntegerField()
    temp_unit = models.ForeignKey(Unit, on_delete=models.PROTECT)
    yield_quantity = models.FloatField()
    yield_name = models.CharField(max_length=255)
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)