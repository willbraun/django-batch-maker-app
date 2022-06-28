from django.db import models
from django.contrib.auth.models import AbstractUser
# from recipes.models import Recipe

# Create your models here.
class User(AbstractUser):
    pass


# class Favorite(models.Model):
#     user = models.ForeignKey(User)
#     recipe = models.ForeignKey(Recipe)