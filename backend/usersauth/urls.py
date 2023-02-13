from django.urls import path,include
from .views import (UsersListAPI, ProfileAPI, UserDetailAPI)

urlpatterns = [
    path('all/',UsersListAPI.as_view(),name='user-list'),
    path('profile/',ProfileAPI.as_view()),
    path('<int:pk>/',UserDetailAPI),
    path('auth/', include('dj_rest_auth.urls')),
    path('register/',include('dj_rest_auth.registration.urls')),
]