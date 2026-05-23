from rest_framework import serializers
from .models import Task, TaskComment, TaskAttachment
from accounts.models import User, Department

class UserBasicSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'email', 'role', 'profile_picture', 'department_name']

class TaskCommentSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = TaskComment
        fields = ['id', 'task', 'user', 'comment', 'created_at']
        read_only_fields = ['user']

class TaskAttachmentSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = TaskAttachment
        fields = ['id', 'task', 'user', 'file_url', 'file_name', 'created_at']
        read_only_fields = ['user']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserBasicSerializer(source='assigned_to', read_only=True)
    created_by_details = UserBasicSerializer(source='created_by', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    comments = TaskCommentSerializer(many=True, read_only=True)
    attachments = TaskAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'department', 'department_name', 
            'assigned_to', 'assigned_to_details', 'created_by', 'created_by_details', 
            'status', 'due_date', 'created_at', 'updated_at',
            'comments', 'attachments'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
