from django.urls import include, path

app_name = 'api'

urlpatterns = [
    path('recipes/', include('recipes.urls', namespace='recipes')),
]