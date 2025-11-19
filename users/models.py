# users/models.py
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'MASTER_ADMIN')
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    ROLE_CHOICES = [
        ('MASTER_ADMIN', 'Master Admin'),
        ('SUPER_ADMIN', 'Super Admin'),
        ('ADMIN', 'Admin'),
        ('LOAN_OFFICER', 'Loan Officer'),
        ('UNDERWRITER', 'Underwriter'),
        ('FINANCE_STAFF', 'Finance Staff'),
        ('SALES_EXECUTIVE', 'Sales Executive'),
        ('BORROWER', 'Borrower'),
    ]
    
    username = None
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='BORROWER')
    
    # Multi-tenant
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, null=True, blank=True)
    branch = models.ForeignKey('tenants.Branch', on_delete=models.SET_NULL, null=True, blank=True)
    
    # Additional
    employee_id = models.CharField(max_length=50, blank=True)
    approval_limit = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"


class AuditLog(models.Model):
    """Audit Trail"""
    
    ACTION_TYPES = [
        ('LOGIN', 'Login'),
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
        ('APPROVE', 'Approve'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.SET_NULL, null=True, blank=True)
    
    action_type = models.CharField(max_length=50, choices=ACTION_TYPES)
    module = models.CharField(max_length=50)
    description = models.TextField()
    ip_address = models.GenericIPAddressField()
    
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'audit_logs'
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.user} - {self.action_type}"
    
from django.conf import settings
from django.db import models
from tenants.models import Tenant


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    tenant = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True, blank=True)

    role = models.CharField(
        max_length=50,
        choices=[
            ('ADMIN', 'Admin'),
            ('UNDERWRITER', 'Underwriter'),
            ('COLLECTION', 'Collection Officer'),
            ('LENDER', 'Lender Agent'),
            ('CUSTOMER', 'Customer'),
        ],
        default='CUSTOMER'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.role}"
