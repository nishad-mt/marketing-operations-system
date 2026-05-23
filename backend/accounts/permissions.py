from rest_framework import permissions

class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.role == 'manager' or request.user.is_superuser))

class IsContentDepartment(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['content_head', 'script_writer', 'copy_writer']
        )

class IsCreativeDepartment(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['creator', 'video_editor', 'designer']
        )

class IsMarketingDepartment(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['social_media_executive', 'performance_marketer']
        )

class IsManagerOrDepartmentMember(permissions.BasePermission):
    """
    Allows managers to access anything, but other roles can only access if they belong to a specific department.
    We might need custom object-level permissions depending on the view.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'manager' or request.user.is_superuser:
            return True
        # For a Task object, allow if the task department matches user's department
        if hasattr(obj, 'department') and request.user.department:
            return obj.department == request.user.department
        return False
