# los/admin.py
from django.contrib import admin
from .models import LoanApplication, KYCDetail, CreditAssessment

@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('application_id', 'customer', 'amount', 'tenure_months', 'status', 'created_at')
    search_fields = ('application_id', 'customer__first_name', 'customer__phone')
    list_filter = ('status',)

@admin.register(KYCDetail)
class KYCDetailAdmin(admin.ModelAdmin):
    list_display = ('loan_application', 'kyc_type', 'document_number', 'status', 'uploaded_at')
    search_fields = ('loan_application__application_id', 'document_number')

@admin.register(CreditAssessment)
class CreditAssessmentAdmin(admin.ModelAdmin):
    list_display = ('application', 'score', 'status', 'approved_limit', 'assessed_at')
    search_fields = ('application__application_id',)
