from distutils.command.upload import upload
from django.db import models
from django.conf import settings
from units.models import Unit

# Create your models here.

class Recipe(models.Model):
    TYPES = (
        ('BR', 'Breakfast',),
        ('LU', 'Lunch',),
        ('DI', 'Dinner',),
        ('DE', 'Dessert',),
    )
    
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
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    shares = models.PositiveIntegerField(default=0, blank=True)

    def __str__(self):
        return self.title