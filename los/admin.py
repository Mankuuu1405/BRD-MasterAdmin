from django.contrib import admin
from .models import LoanApplication, KYCDetail, CreditAssessment


@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'application_id', 'tenant', 'branch', 'customer',
        'loan_amount', 'tenure_months', 'status',
        'sanctioned_amount', 'created_at',
    )
    search_fields = ('application_id', 'customer__first_name', 'customer__phone')
    list_filter = ('tenant', 'branch', 'status', 'created_at')
    readonly_fields = ('application_id', 'created_at', 'updated_at')


@admin.register(KYCDetail)
class KYCDetailAdmin(admin.ModelAdmin):
    list_display = ('customer', 'kyc_type', 'document_number', 'status', 'uploaded_at')
    search_fields = ('customer__first_name', 'customer__phone', 'document_number')
    list_filter = ('kyc_type', 'status', 'uploaded_at')
    readonly_fields = ('uploaded_at',)


@admin.register(CreditAssessment)
class CreditAssessmentAdmin(admin.ModelAdmin):
    list_display = ('application', 'score', 'risk_band', 'status', 'approved_limit', 'assessed_at')
    search_fields = ('application__application_id',)
    list_filter = ('status', 'risk_band', 'assessed_at')
    readonly_fields = ('assessed_at',)
