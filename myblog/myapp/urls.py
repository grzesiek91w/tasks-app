from django.urls import path, re_path

from .views import register, CustomLoginView, CustomLogoutView, post_list, post_create, post_detail, CatchAllView

from django.contrib.auth import views as auth_views  # Import auth_views

urlpatterns = [

    path('register/', register, name='register'),

    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),

    # path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # path('register/', register, name='register'),

    # path('login/', CustomLoginView.as_view(), name='login'),

    path('', post_list, name='post_list'),  # Home page showing all posts
    

    path('post/create/', post_create, name='post_create'),  # Create a new post

    path('post/<int:pk>/', post_detail, name='post_detail'),  # Detail view of a post

    re_path(r'^.*$', CatchAllView.as_view(), name='catch_all'),  # Catch-all wildcard URL
]