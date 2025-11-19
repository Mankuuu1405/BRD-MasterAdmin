from django.db import models
from tenants.models import Tenant, Branch

KYC_STATUS_CHOICES = [
    ('PENDING', 'Pending'),
    ('IN_PROGRESS', 'In Progress'),
    ('VERIFIED', 'Verified'),
    ('REJECTED', 'Rejected'),
]

LEAD_STATUS_CHOICES = [
    ('NEW', 'New'),
    ('CONTACTED', 'Contacted'),
    ('QUALIFIED', 'Qualified'),
    ('REJECTED', 'Rejected'),
]

class Lead(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='leads')
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    source = models.CharField(max_length=100, blank=True)  # digital, walk-in etc.
    status = models.CharField(max_length=20, choices=LEAD_STATUS_CHOICES, default='NEW')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'crm_leads'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} ({self.phone})"


class Customer(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='customers')
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True)
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True, blank=True)

    # basic profile
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateField(null=True, blank=True)

    # KYC
    pan_number = models.CharField(max_length=20, blank=True)
    aadhaar_number = models.CharField(max_length=20, blank=True)
    kyc_status = models.CharField(max_length=20, choices=KYC_STATUS_CHOICES, default='PENDING')

    # employment / income (from client doc)
    employment_status = models.CharField(max_length=100, blank=True)  # salaried, self-employed, etc.
    employer_name = models.CharField(max_length=200, blank=True)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    # business details
    business_name = models.CharField(max_length=200, blank=True)
    business_type = models.CharField(max_length=100, blank=True)
    gst_number = models.CharField(max_length=20, blank=True)
    business_turnover = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)

    # credit health from underwriting engine / bureau
    credit_score = models.IntegerField(null=True, blank=True)
    risk_indicator = models.CharField(max_length=100, blank=True)  # e.g. "LOW", "MEDIUM", "HIGH"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'crm_customers'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.phone}"
