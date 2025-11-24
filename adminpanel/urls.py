from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    LoanProductViewSet, ChargeMasterViewSet,
    DocumentTypeViewSet, NotificationTemplateViewSet,
    RoleMasterViewSet
)

router = DefaultRouter()
router.register(r'loan-products', LoanProductViewSet)
router.register(r'charges', ChargeMasterViewSet)
router.register(r'document-types', DocumentTypeViewSet)
router.register(r'notification-templates', NotificationTemplateViewSet)
router.register(r'roles', RoleMasterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
