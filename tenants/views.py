from rest_framework import viewsets
from .models import Tenant, Branch
from .serializers import TenantSerializer, BranchSerializer
from users.permissions import DefaultPermission


class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [DefaultPermission]

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.select_related('tenant').all()
    serializer_class = BranchSerializer
    permission_classes = [DefaultPermission]
