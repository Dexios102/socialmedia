from django.urls import path
from .views import (PostListAPI,PostDetailAPI,PostUpdateDeleteView, CommentCreateAPI,CommentDelete,PostLikeAPI,search)

urlpatterns = [
    path('feed/',PostListAPI.as_view(),name='feed'),
    path('feed/<int:pk>/',PostDetailAPI.as_view()),
    path('feed/edit/<int:pk>/',PostUpdateDeleteView.as_view()),
    path('feed/like/<int:pk>/',PostLikeAPI),
    path('feed/comment/',CommentCreateAPI.as_view()),
    path('feed/comment/<int:pk>/',CommentDelete.as_view()),
    path('search',search),
]