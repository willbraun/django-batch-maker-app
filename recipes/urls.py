from django.urls import path

from recipes.views import FavoriteRecipesListApiView, PopularRecipesListApiView, PublicRecipesListApiView, MyRecipesCreateApiView, MyRecipesListApiView

app_name = 'recipes'

urlpatterns = [
    path('favorites/', FavoriteRecipesListApiView.as_view(), name='favorite_recipes'),
    path('popular/', PopularRecipesListApiView.as_view(), name='popular_recipes'),
    path('public/', PublicRecipesListApiView.as_view(), name='public_recipes'),
    path('add/', MyRecipesCreateApiView.as_view(), name='add_recipe'),
    path('<str:home>/', MyRecipesListApiView.as_view(), name='my_recipes'),
    path('', MyRecipesListApiView.as_view(), name='my_recipes'),
]