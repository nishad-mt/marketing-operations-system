from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task, TaskComment, TaskAttachment
from .serializers import TaskSerializer, TaskCommentSerializer, TaskAttachmentSerializer
from accounts.permissions import IsManagerOrDepartmentMember

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrDepartmentMember]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager' or user.is_superuser:
            return Task.objects.all().order_by('-created_at')
        
        # If not a manager, they only see tasks from their department
        if user.department:
            return Task.objects.filter(department=user.department).order_by('-created_at')
        
        return Task.objects.none()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        task = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Task.STATUS_CHOICES):
            task.status = new_status
            task.save()
            return Response({'status': 'status updated'})
        else:
            return Response({'error': 'invalid status'}, status=status.HTTP_400_BAD_REQUEST)

class TaskCommentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskComment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskAttachmentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskAttachment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
