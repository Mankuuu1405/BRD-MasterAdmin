from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, BranchViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('tenants', TenantViewSet, basename='tenant')
router.register('branches', BranchViewSet, basename='branch')

urlpatterns = [
    path('', include(router.urls)),
]
