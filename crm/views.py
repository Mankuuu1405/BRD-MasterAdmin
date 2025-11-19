from rest_framework import viewsets
from .models import Lead, Customer
from .serializers import LeadSerializer, CustomerSerializer
from users.permissions import DefaultPermission

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [DefaultPermission]

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [DefaultPermission]
