from rest_framework.routers import DefaultRouter
from .views import LeadViewSet, CustomerViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('leads', LeadViewSet, basename='lead')
router.register('customers', CustomerViewSet, basename='customer')

urlpatterns = [
    path('', include(router.urls)),
]
