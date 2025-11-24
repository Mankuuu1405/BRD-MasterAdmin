from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import home

urlpatterns = [
    # Home URL (optional)
    path('', home),

    # Admin Panel
    path('admin/', admin.site.urls),

    # Authentication (LOGIN)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App Routes
    path('api/tenants/', include('tenants.urls')),
    path('api/crm/', include('crm.urls')),
    path('api/los/', include('los.urls')),
    path('api/lms/', include('lms.urls')),
    path('api/integrations/', include('integrations.urls')),
    path('api/compliance/', include('compliance.urls')),
    path('api/reporting/', include('reporting.urls')),
    path('api/users/', include('users.urls')),
    path('api/communications/', include('communications.urls')),
    path('api/documents/', include('documents.urls')),
    path('api/adminpanel/', include('adminpanel.urls')),
]
