from django.contrib import admin
from django.urls import path, include   # <-- YOU MISSED THIS path import earlier
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import home


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),

    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/v1/", include("frontend_mock.urls")),

    path("api/v1/tenants/", include("tenants.urls")),
    path("api/v1/users/", include("users.urls")),
    path("api/v1/crm/", include("crm.urls")),
    path("api/v1/integrations/", include("integrations.urls")),

    # ⭐ ADD THIS FOR LEADS
    path("api/v1/lead-management/", include("adminpanel.lead_management.urls")),
]
