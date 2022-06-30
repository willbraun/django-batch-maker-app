from django.shortcuts import render
from rest_framework import generics
from .models import Recipe, User
from .serializers import RecipeSerializer, RecipePreviewSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def home_recipes_by_category(request):
    my_recipes = RecipePreviewSerializer(Recipe.objects.filter(author=request.user).order_by('-created_at')[:4], many=True).data
    public = RecipePreviewSerializer(Recipe.objects.filter(public=True).order_by('-created_at')[:5], many=True).data
    popular = RecipePreviewSerializer(Recipe.objects.filter(public=True).order_by('-shares')[:5], many=True).data
    favorites = RecipePreviewSerializer(Recipe.objects.filter(favorited_by=request.user).order_by('title')[:5], many=True).data

    content = {
        'my_recipes': my_recipes,
        'public': public,
        'popular': popular,
        'favorites': favorites,
    }

    return Response(content)


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
    