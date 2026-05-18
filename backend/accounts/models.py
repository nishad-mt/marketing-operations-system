from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = [
        ("manager", "Manager"),
        ("content_head", "Content Head"),
        ("writer", "Writer"),
        ("designer", "Designer"),
    ]

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES,
        default="writer"
    )

    google_id = models.CharField(max_length=255,unique=True,null=True,blank=True)

    profile_picture = models.URLField(null=True,blank=True)

    is_approved = models.BooleanField(default=False)