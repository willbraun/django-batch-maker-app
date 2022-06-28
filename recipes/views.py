from django.shortcuts import render
from rest_framework import generics
from .models import Recipe, User
from .serializers import RecipeSerializer, RecipePreviewSerializer, RecipeFavoriteUpdateSerializer

# Create your views here.
class MyRecipesListApiView(generics.ListAPIView):
    serializer_class = RecipePreviewSerializer

    def get_queryset(self):
        return Recipe.objects.filter(author=self.request.user).order_by('-created_at')


class MyRecipesCreateApiView(generics.CreateAPIView):
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PublicRecipesListApiView(generics.ListAPIView):
    queryset = Recipe.objects.filter(public=True).order_by('-created_at')
    serializer_class = RecipePreviewSerializer


class PopularRecipesListApiView(generics.ListAPIView):
    queryset = Recipe.objects.filter(public=True).order_by('-shares')
    serializer_class = RecipePreviewSerializer


class FavoriteRecipesListApiView(generics.ListAPIView):
    serializer_class = RecipePreviewSerializer
    
    def get_queryset(self):
        return Recipe.objects.filter(favorited_by=self.request.user).order_by('title')


class FavoriteRecipeUpdateApiView(generics.UpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeFavoriteUpdateSerializer

    # def get_queryset(self):
    #     return self

    def perform_update(self, serializer):
        return self.favorited_by.add(self.request.user)
        


# after creating get users favorites view, create another view that combines the above querysets into one view, getting first 4 or 5 with [:4]
# maybe define the querysets outside the classes so they can be re-used easily
    