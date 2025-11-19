from django.db import models
import uuid
from tenants.models import Tenant, Branch
from crm.models import Customer
from users.models import User  # your existing user model


APPLICATION_STATUS_CHOICES = [
    ('NEW', 'New'),
    ('IN_REVIEW', 'In Review'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
    ('DISBURSED', 'Disbursed'),
]


class LoanApplication(models.Model):
    application_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tenure_months = models.IntegerField()
    loan_purpose = models.CharField(max_length=200, blank=True)

    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    processing_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    status = models.CharField(max_length=30, choices=APPLICATION_STATUS_CHOICES, default='NEW')

    sanctioned_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    sanction_date = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications_created'
    )
    underwriter = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications_underwritten'
    )
    underwriter_comments = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'loan_applications'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.application_id} - {self.customer.first_name}"


KYC_TYPES = [
    ('AADHAAR', 'Aadhaar'),
    ('PAN', 'PAN'),
    ('VOTER_ID', 'Voter ID'),
    ('PASSPORT', 'Passport'),
    ('BANK_STATEMENT', 'Bank Statement'),
    ('SALARY_SLIP', 'Salary Slip'),
]


class KYCDetail(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='kyc_details')
    kyc_type = models.CharField(max_length=50, choices=KYC_TYPES)
    document_number = models.CharField(max_length=100)
    document_file = models.FileField(upload_to='kyc_docs/%Y/%m/%d/', blank=True)
    status = models.CharField(max_length=20, default='PENDING')  # PENDING, VERIFIED, REJECTED
    remarks = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'kyc_details'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.customer.first_name} - {self.kyc_type}"


CREDIT_STATUS_CHOICES = [
    ('UNDER_REVIEW', 'Under Review'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
]


class CreditAssessment(models.Model):
    application = models.OneToOneField(LoanApplication, on_delete=models.CASCADE, related_name='credit_assessment')
    score = models.IntegerField()
    risk_band = models.CharField(max_length=50, blank=True)  # e.g. A, B, C
    pd = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # probability of default %
    remarks = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=CREDIT_STATUS_CHOICES, default='UNDER_REVIEW')
    approved_limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    assessed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'credit_assessments'
        ordering = ['-assessed_at']

    def __str__(self):
        return f"{self.application.application_id} - Score: {self.score}"
