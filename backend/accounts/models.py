from django.contrib.auth.models import AbstractUser
from django.db import models


class Department(models.Model):

    DEPARTMENT_CHOICES = [

        ("management", "Management"),

        ("social_media", "Social Media"),

        ("performance_marketing", "Performance Marketing"),

        ("content", "Content"),

        ("production", "Production"),

        ("post_production", "Post Production"),
    ]

    name = models.CharField(max_length=100,choices=DEPARTMENT_CHOICES,unique=True)

    def __str__(self):
        return self.get_name_display()


class User(AbstractUser):

    ROLE_CHOICES = [

        ("manager", "Manager"),

        ("social_media_executive", "Social Media Executive"),

        ("performance_marketer", "Performance Marketer"),

        ("content_head", "Content Head"),

        ("script_writer", "Script Writer"),

        ("copy_writer", "Copy Writer"),

        ("creator", "Creator"),

        ("video_editor", "Video Editor"),

        ("designer", "Designer"),
    ]

    department = models.ForeignKey(Department,on_delete=models.SET_NULL,null=True,blank=True)

    role = models.CharField(max_length=100,choices=ROLE_CHOICES)

    mobile_number = models.CharField(max_length=15,unique=True,null=True,blank=True)

    google_id = models.CharField(max_length=255,unique=True,null=True,blank=True)

    profile_picture = models.URLField(null=True,blank=True)

    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username