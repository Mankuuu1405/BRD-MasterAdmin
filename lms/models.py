from django.db import models
from los.models import LoanApplication


LOAN_STATUS_CHOICES = [
    ('ACTIVE', 'Active'),
    ('CLOSED', 'Closed'),
    ('DEFAULT', 'Default'),
    ('RESTRUCTURED', 'Restructured'),
]


class LoanAccount(models.Model):
    loan = models.OneToOneField(LoanApplication, on_delete=models.CASCADE, related_name='loan_account')
    account_id = models.CharField(max_length=50, unique=True)
    principal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    emi_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tenure_months = models.IntegerField()
    outstanding = models.DecimalField(max_digits=12, decimal_places=2)
    next_due_date = models.DateField(null=True, blank=True)

    status = models.CharField(max_length=30, choices=LOAN_STATUS_CHOICES, default='ACTIVE')
    is_restructured = models.BooleanField(default=False)
    closure_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'loan_accounts'
        ordering = ['-created_at']

    def __str__(self):
        return self.account_id


REPAYMENT_STATUS_CHOICES = [
    ('PENDING', 'Pending'),
    ('PAID', 'Paid'),
    ('PARTIAL', 'Partial'),
    ('BOUNCED', 'Bounced'),
]


class Repayment(models.Model):
    loan_account = models.ForeignKey(LoanAccount, on_delete=models.CASCADE, related_name='repayments')
    due_date = models.DateField()
    amount_due = models.DecimalField(max_digits=12, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=REPAYMENT_STATUS_CHOICES, default='PENDING')
    reference = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'repayments'
        ordering = ['-due_date']

    def __str__(self):
        return f"{self.loan_account.account_id} - {self.due_date}"


class Collection(models.Model):
    loan_account = models.ForeignKey(LoanAccount, on_delete=models.CASCADE, related_name='collections')
    amount_collected = models.DecimalField(max_digits=12, decimal_places=2)
    collector = models.CharField(max_length=100)  # could later be FK to user
    channel = models.CharField(max_length=50, blank=True)  # field visit, call, etc.
    date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        db_table = 'collections'
        ordering = ['-date']

    def __str__(self):
        return f"{self.loan_account.account_id} - {self.amount_collected}"
