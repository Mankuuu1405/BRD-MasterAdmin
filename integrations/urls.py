from rest_framework.routers import DefaultRouter
from .views import APIIntegrationViewSet, WebhookLogViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('integrations', APIIntegrationViewSet, basename='integration')
router.register('webhook-logs', WebhookLogViewSet, basename='webhooklog')

urlpatterns = [
    path('', include(router.urls)),
]
