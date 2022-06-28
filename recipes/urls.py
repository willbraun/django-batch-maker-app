from django.urls import include, path

from recipes.views import PopularRecipesListApiView, PublicRecipesListApiView, MyRecipesListCreateApiView

app_name = 'recipes'

urlpatterns = [
    path('popular/', PopularRecipesListApiView.as_view(), name='popular_recipes'),
    path('public/', PublicRecipesListApiView.as_view(), name='public_recipes'),
    path('', MyRecipesListCreateApiView.as_view(), name='my_recipes'),
]