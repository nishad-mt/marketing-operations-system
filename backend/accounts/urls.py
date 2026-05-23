from django.urls import path

from .views import (
    GoogleLoginView,
    DevLoginView,
    ApproveUserView,
    PendingUserView,
    RejectUserView,
    ManagerDashboardStatsView,
    EmployeeListView,
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [

    # DEV-ONLY: simple username/password login
    path(
        'dev-login/',
        DevLoginView.as_view()
    ),

    path(
        'google/',
        GoogleLoginView.as_view()
    ),

    path(
        'refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

    path(
        'pending-users/',
        PendingUserView.as_view()
    ),

    path(
        'approve/<int:user_id>/',
        ApproveUserView.as_view()
    ),

    path(
        'reject/<int:user_id>/',
        RejectUserView.as_view()
    ),

    path(
        'manager-dashboard-stats/',
        ManagerDashboardStatsView.as_view()
    ),

    path(
        'employees/',
        EmployeeListView.as_view()
    )
]