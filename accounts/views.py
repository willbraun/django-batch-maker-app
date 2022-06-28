# from django.shortcuts import render
# from rest_framework import generics
# from .models import Recipe
# from recipes.serializers import RecipePreviewSerializer

# # Create your views here.
# class UserFavoritesListCreateApiView(generics.ListCreateAPIView):
#     serializer_class = RecipePreviewSerializer

#     def get_queryset(self):
#         return Recipe.objects.filter(author=self.request.user).order_by('-created_at')