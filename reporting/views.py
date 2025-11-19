from rest_framework import viewsets
from .models import Report, Analytics
from .serializers import ReportSerializer, AnalyticsSerializer
from users.permissions import DefaultPermission

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [DefaultPermission]

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [DefaultPermission]
