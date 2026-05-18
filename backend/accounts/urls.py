from django.urls import path

from .views import (
    GoogleLoginView,
    ApproveUserView
)

urlpatterns = [

    path(
        '',
        GoogleLoginView.as_view()
    ),

    path(
        'approve/<int:user_id>/',
        ApproveUserView.as_view()
    ),
]