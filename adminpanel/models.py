from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# ---------------------------
# 1. Loan Product Master
# ---------------------------
class LoanProduct(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    processing_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "admin_loan_products"
        ordering = ['-created_at']

    def __str__(self):
        return self.name


# ---------------------------
# 2. Charge Master
# ---------------------------
class ChargeMaster(models.Model):
    CHARGE_TYPES = (
        ('processing', 'Processing Fee'),
        ('penalty', 'Penalty'),
        ('other', 'Other Charges'),
    )

    name = models.CharField(max_length=200)
    charge_type = models.CharField(max_length=20, choices=CHARGE_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_percentage = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "admin_charge_master"

    def __str__(self):
        return self.name


# ---------------------------
# 3. Document Types
# ---------------------------
class DocumentType(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=50, unique=True)
    is_required = models.BooleanField(default=True)

    class Meta:
        db_table = "admin_document_types"

    def __str__(self):
        return self.name


# ---------------------------
# 4. Notification Templates
# ---------------------------
class NotificationTemplate(models.Model):
    TEMPLATE_TYPES = (
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('system', 'System Notification'),
    )

    name = models.CharField(max_length=200)
    template_type = models.CharField(max_length=20, choices=TEMPLATE_TYPES)
    subject = models.CharField(max_length=300, null=True, blank=True)
    body = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "admin_notification_templates"

    def __str__(self):
        return f"{self.name} ({self.template_type})"


# ---------------------------
# 5. Role Master
# ---------------------------
class RoleMaster(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "admin_role_master"

    def __str__(self):
        return self.name
