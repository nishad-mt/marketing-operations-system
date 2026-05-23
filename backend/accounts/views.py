from decouple import config

from google.oauth2 import id_token
from google.auth.transport import requests

from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Department
from .serializers import GoogleLoginSerializer


GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID').strip()


# ─────────────────────────────────────────────
# DEV-ONLY: Username / Password login
# Remove or guard with DEBUG=True in production
# ─────────────────────────────────────────────
class DevLoginView(APIView):

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '').strip()

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response(
                {'error': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            'message': 'Dev login successful',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'name': user.first_name or user.username,
                'email': user.email,
                'role': user.role if hasattr(user, 'role') else 'manager',
                'profile_picture': user.profile_picture if hasattr(user, 'profile_picture') else None,
                'department': (
                    user.department.name
                    if hasattr(user, 'department') and user.department
                    else None
                ),
            }
        })


class GoogleLoginView(APIView):

    def post(self, request):

        serializer = GoogleLoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        token = serializer.validated_data['token']
        role = serializer.validated_data.get('role')
        mobile_number = serializer.validated_data.get('mobile_number')

        try:

            # Verify Google token (clock_skew_in_seconds handles minor drift)
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                GOOGLE_CLIENT_ID,
                clock_skew_in_seconds=10
            )

            email = idinfo.get("email")
            name = idinfo.get("name")
            picture = idinfo.get("picture")
            google_id = idinfo.get("sub")

            # Existing user
            existing_user = User.objects.filter(
                email=email
            ).first()

            # LOGIN FLOW
            if existing_user:

                if not existing_user.is_approved:

                    return Response(
                        {
                            "message": "Waiting for manager approval"
                        },
                        status=status.HTTP_403_FORBIDDEN
                    )

                refresh = RefreshToken.for_user(
                    existing_user
                )

                return Response({

                    "message": "Login successful",

                    "access": str(refresh.access_token),

                    "refresh": str(refresh),

                    "user": {
                        "id": existing_user.id,
                        "name": existing_user.first_name,
                        "email": existing_user.email,
                        "role": existing_user.role,
                        "profile_picture": existing_user.profile_picture,
                        "department": (
                            existing_user.department.name
                            if existing_user.department
                            else None
                        ),
                    }
                })

            # SIGNUP FLOW

            role_department_map = {

                "manager": "management",

                "social_media": "social_media",
                "social_media_executive": "social_media",

                "performance_marketer":
                    "performance_marketing",

                "content_head": "content",

                "script_writer": "content",

                "copy_writer": "content",

                "creator": "production",

                "editor": "post_production",
                "video_editor": "post_production",
            }

            department_name = role_department_map.get(
                role
            )

            department = Department.objects.filter(
                name=department_name
            ).first()

            # Create new user
            user = User.objects.create(

                username=email,

                email=email,

                first_name=name,

                google_id=google_id,

                profile_picture=picture,

                mobile_number=mobile_number,

                role=role,

                department=department,

                is_approved=False,
            )

            return Response(

                {
                    "message":
                        "Signup successful. Waiting for manager approval."
                },

                status=status.HTTP_201_CREATED
            )

        except ValueError as e:

            import traceback
            traceback.print_exc()          # prints full reason to the Django console

            return Response(

                {
                    "error": f"Invalid Google token: {e}"
                },

                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:

            return Response(

                {
                    "error": str(e)
                },

                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ApproveUserView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, user_id):

        current_user = request.user


        if (
            current_user.role != "manager"
            and not current_user.is_superuser
        ):

            return Response(

                {
                    "error": "Permission denied"
                },

                status=status.HTTP_403_FORBIDDEN
            )

        try:

            user = User.objects.get(
                id=user_id
            )

            user.is_approved = True

            user.save()

            return Response({

                "message":
                    "User approved successfully"
            })

        except User.DoesNotExist:

            return Response(

                {
                    "error": "User not found"
                },

                status=status.HTTP_404_NOT_FOUND
            )
        
class PendingUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        current_user = request.user

        if (
            current_user.role != "manager"
            and not current_user.is_superuser
        ):

            return Response(

                {
                    "error": "Permission denied"
                },

                status=status.HTTP_403_FORBIDDEN
            )
        
        users = User.objects.filter(is_approved=False, is_superuser=False)

        data = []

        for user in users:
            data.append({
                "id" : user.id,

                "name": user.first_name,

                "email": user.email,

                "mobile_number": user.mobile_number,

                "role": user.role,

                "department": (
                    user.department.name
                    if user.department
                    else None
                )
            })

        return Response(data)

class RejectUserView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):

        current_user = request.user

        if (
            current_user.role != "manager"
            and not current_user.is_superuser
        ):
            return Response(
                {"error":"Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        try:

            user = User.objects.get(id=user_id)

            user.delete()

        except User.DoesNotExist:

            return Response(
                {"error":"User not Found"},
                status=status.HTTP_404_NOT_FOUND
            )

class ManagerDashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        current_user = request.user

        if (
            current_user.role != "manager"
            and not current_user.is_superuser
        ):
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        total_employees = User.objects.filter(is_approved=True).count()

        from tasks.models import Task

        active_tasks = Task.objects.exclude(status__in=['completed', 'approved']).count()
        pending_reviews = Task.objects.filter(status='in_review').count()
        completed_this_month = Task.objects.filter(status='approved').count() # Simplified

        recent_tasks_qs = Task.objects.all().order_by('-created_at')[:5]
        recent_tasks = []
        for t in recent_tasks_qs:
            recent_tasks.append({
                "id": t.id,
                "title": t.title,
                "department": t.department.name if t.department else "None",
                "status": t.get_status_display(),
            })

        return Response({
            "totalEmployees": total_employees,
            "activeTasks": active_tasks,
            "pendingReviews": pending_reviews,
            "completedThisMonth": completed_this_month,
            "recentTasks": recent_tasks
        })

class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user

        if current_user.role != "manager" and not current_user.is_superuser:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        users = User.objects.filter(is_approved=True, is_superuser=False).prefetch_related('assigned_tasks')
        
        data = []
        for user in users:
            # Active tasks for this user
            user_tasks = user.assigned_tasks.exclude(status__in=['approved', 'completed'])
            tasks_data = []
            for t in user_tasks:
                tasks_data.append({
                    "id": t.id,
                    "title": t.title,
                    "status": t.get_status_display(),
                    "due_date": t.due_date.isoformat() if t.due_date else None,
                })

            data.append({
                "id": user.id,
                "name": user.first_name,
                "email": user.email,
                "role": user.role,
                "department": user.department.name if user.department else None,
                "active_tasks": tasks_data,
            })

        return Response(data)
