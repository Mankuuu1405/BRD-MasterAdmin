from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Lead, Customer
from .serializers import LeadSerializer, CustomerSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().select_related('tenant', 'branch')
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = ['status', 'tenant', 'branch', 'source']
    search_fields = ['full_name', 'phone', 'email']
    ordering_fields = ['created_at', 'full_name']
    ordering = ['-created_at']


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().select_related('tenant', 'branch', 'lead')
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = [
        'tenant', 'branch', 'kyc_status', 'employment_status',
        'risk_indicator', 'credit_score'
    ]

    search_fields = [
        'first_name', 'last_name', 'email', 'phone',
        'pan_number', 'aadhaar_number'
    ]

    ordering_fields = ['created_at', 'updated_at', 'first_name']
    ordering = ['-created_at']
