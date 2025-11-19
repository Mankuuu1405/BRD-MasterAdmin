from django.contrib import admin
from .models import LoanAccount, Repayment, Collection


@admin.register(LoanAccount)
class LoanAccountAdmin(admin.ModelAdmin):
    list_display = (
        'account_id', 'loan', 'principal_amount', 'outstanding',
        'emi_amount', 'status', 'is_restructured', 'created_at'
    )
    search_fields = ('account_id', 'loan__application_id', 'loan__customer__phone')
    list_filter = ('status', 'is_restructured', 'created_at')
    readonly_fields = ('created_at',)


@admin.register(Repayment)
class RepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan_account', 'due_date', 'amount_due', 'amount_paid', 'status', 'paid_at')
    search_fields = ('loan_account__account_id', 'reference')
    list_filter = ('status', 'due_date')
    readonly_fields = ('created_at',)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('loan_account', 'amount_collected', 'collector', 'channel', 'date')
    search_fields = ('loan_account__account_id', 'collector')
    list_filter = ('channel', 'date')
    readonly_fields = ('date',)
