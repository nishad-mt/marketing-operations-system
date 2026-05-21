from django.urls import path

from .views import (
    GoogleLoginView,
    ApproveUserView,
    PendingUserView,
    RejectUserView,
    ManagerDashboardStatsView,
)

urlpatterns = [

    path(
        'google/',
        GoogleLoginView.as_view()
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
    )
]