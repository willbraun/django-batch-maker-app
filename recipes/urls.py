from django.urls import include, path

from recipes.views import PopularRecipesListApiView, PublicRecipesListApiView, MyRecipesCreateApiView, MyRecipesListApiView

app_name = 'recipes'

urlpatterns = [
    path('popular/', PopularRecipesListApiView.as_view(), name='popular_recipes'),
    path('public/', PublicRecipesListApiView.as_view(), name='public_recipes'),
    path('add/', MyRecipesCreateApiView.as_view(), name='add_recipe'),
    path('', MyRecipesListApiView.as_view(), name='my_recipes'),
]