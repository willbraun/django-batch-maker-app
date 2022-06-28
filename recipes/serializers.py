from rest_framework import serializers

# from recipes.views import PopularRecipesListApiView
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Recipe
        fields = '__all__'


class RecipePreviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ('id', 'title','image', 'popular')


class RecipeFavoriteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id',)


class RecipeHomeSerializer(serializers.ModelSerializer):
   

    class Meta:
        model = Recipe
        fields = '__all__'