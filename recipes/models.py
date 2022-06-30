from distutils.command.upload import upload
from django.db import models
from django.conf import settings
from accounts.models import User


class Recipe(models.Model):
    TYPES = (
        ('BR', 'Breakfast',),
        ('LU', 'Lunch',),
        ('DI', 'Dinner',),
        ('DE', 'Dessert',),
    )

    TEMP_UNITS = (
        ('FA', 'Fahrenheit',),
        ('CE', 'Celsius',),
    )
    
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    by = models.CharField(max_length=255)
    image = models.ImageField(upload_to='recipes/images/')
    public = models.BooleanField()
    recipe_type = models.CharField(max_length=2, choices=TYPES)
    prep_time = models.PositiveIntegerField()
    cook_time = models.PositiveIntegerField()
    cook_temp = models.IntegerField()
    temp_unit = models.CharField(max_length=2, choices=TEMP_UNITS)
    yield_quantity = models.FloatField()
    yield_name = models.CharField(max_length=255)
    steps = models.JSONField(null=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    shares = models.PositiveIntegerField(default=0, blank=True)
    favorited_by = models.ManyToManyField(User, related_name='+')

    def __str__(self):
        return self.title