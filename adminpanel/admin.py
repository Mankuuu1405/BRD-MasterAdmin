from django.contrib import admin
from .models import (
    LoanProduct,
    ChargeMaster,
    DocumentType,
    NotificationTemplate,
    RoleMaster
)

# ---------------------------
# Loan Product Admin
# ---------------------------
@admin.register(LoanProduct)
class LoanProductAdmin(admin.ModelAdmin):
    list_display = ("name", "interest_rate", "processing_fee", "created_at")
    search_fields = ("name",)
    list_filter = ("created_at",)


# ---------------------------
# Charge Master Admin
# ---------------------------
@admin.register(ChargeMaster)
class ChargeMasterAdmin(admin.ModelAdmin):
    list_display = ("name", "charge_type", "amount", "is_percentage", "created_at")
    search_fields = ("name", "charge_type")
    list_filter = ("charge_type", "is_percentage")


# ---------------------------
# Document Type Admin
# ---------------------------
@admin.register(DocumentType)
class DocumentTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "is_required")
    search_fields = ("name", "code")
    list_filter = ("is_required",)


# ---------------------------
# Notification Templates Admin
# ---------------------------
@admin.register(NotificationTemplate)
class NotificationTemplateAdmin(admin.ModelAdmin):
    list_display = ("name", "template_type", "is_active")
    search_fields = ("name", "template_type")
    list_filter = ("template_type", "is_active")


# ---------------------------
# Role Master Admin
# ---------------------------
@admin.register(RoleMaster)
class RoleMasterAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_by", "created_at")
    search_fields = ("name",)
    list_filter = ("created_at",)
