import os
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User

user = User.objects.get(username='nishadmt.py@gmail.com')
refresh = RefreshToken.for_user(user)
access_token = str(refresh.access_token)

headers = {'Authorization': f'Bearer {access_token}'}

print("Testing pending-users...")
res = requests.get('http://127.0.0.1:8000/api/auth/pending-users/', headers=headers)
print("Status:", res.status_code)
print("Response:", res.text)

print("Testing manager-dashboard-stats...")
res2 = requests.get('http://127.0.0.1:8000/api/auth/manager-dashboard-stats/', headers=headers)
print("Status:", res2.status_code)
print("Response:", res2.text)
