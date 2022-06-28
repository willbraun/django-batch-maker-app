from django.urls import include, path

from recipes.views import home_recipes_by_category

app_name = 'api'

urlpatterns = [
    path('recipes/', include('recipes.urls', namespace='recipes')),
    path('home/', home_recipes_by_category, name='home_recipes'),
]