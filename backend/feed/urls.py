from django.urls import path
from .views import (PostListAPI,PostDetailAPI,PostUpdateDeleteView, CommentCreateAPI,CommentDelete,PostLikeAPI)

urlpatterns = [
    path('posts/',PostListAPI.as_view(),name='feed'),
    path('posts/<int:pk>/',PostDetailAPI.as_view()),
    path('posts/edit/<int:pk>/',PostUpdateDeleteView.as_view()),
    path('posts/like/<int:pk>/',PostLikeAPI),
    path('posts/comment/',CommentCreateAPI.as_view()),
    path('posts/comment/<int:pk>/',CommentDelete.as_view()),
]