from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCommentViewSet, TaskAttachmentViewSet

router = DefaultRouter()
router.register(r'', TaskViewSet, basename='task')
router.register(r'comments', TaskCommentViewSet, basename='taskcomment')
router.register(r'attachments', TaskAttachmentViewSet, basename='taskattachment')

urlpatterns = [
    path('', include(router.urls)),
]
