from django.contrib import admin
from .models import Tenant, Branch

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name','tenant_type','email','is_active','created_at')
    search_fields = ('name','email')

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name','tenant','branch_code','is_active')
    search_fields = ('name','branch_code')
