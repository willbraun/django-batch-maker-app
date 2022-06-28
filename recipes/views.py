from django.shortcuts import render
from rest_framework import generics
from .models import Recipe
from .serializers import RecipeSerializer

# Create your views here.
class MyRecipesListCreateApiView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PublicRecipesListApiView(generics.ListAPIView):
    queryset = Recipe.objects.filter(public=True).order_by('-created_at')
    serializer_class = RecipeSerializer


class PopularRecipesListApiView(generics.ListAPIView):
    queryset = Recipe.objects.filter(public=True).order_by('-shares')
    serializer_class = RecipeSerializer


# after creating get users favorites view, create another view that combines the above querysets into one view, getting first 4 or 5 with [:4]
# maybe define the querysets outside the classes so they can be re-used easily
    