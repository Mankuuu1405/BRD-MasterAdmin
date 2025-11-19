from rest_framework import viewsets
from .models import APIIntegration, WebhookLog
from .serializers import APIIntegrationSerializer, WebhookLogSerializer
from users.permissions import DefaultPermission

class APIIntegrationViewSet(viewsets.ModelViewSet):
    queryset = APIIntegration.objects.all()
    serializer_class = APIIntegrationSerializer
    permission_classes = [DefaultPermission]

class WebhookLogViewSet(viewsets.ModelViewSet):
    queryset = WebhookLog.objects.all()
    serializer_class = WebhookLogSerializer
    permission_classes = [DefaultPermission]
