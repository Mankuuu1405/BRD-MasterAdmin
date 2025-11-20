from django.contrib import admin
from .models import Lead, Customer

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'tenant', 'branch', 'status', 'created_at')
    search_fields = ('full_name', 'phone', 'email')
    list_filter = ('status', 'tenant', 'branch', 'source')
    readonly_fields = ('created_at',)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        'first_name', 'last_name', 'phone', 'tenant', 'branch',
        'employment_status', 'kyc_status', 'credit_score',
        'risk_indicator', 'created_at'
    )
    search_fields = (
        'first_name', 'last_name', 'email', 'phone',
        'pan_number', 'aadhaar_number'
    )
    list_filter = (
        'tenant', 'branch', 'employment_status', 'kyc_status', 'risk_indicator'
    )
    readonly_fields = ('created_at', 'updated_at')
