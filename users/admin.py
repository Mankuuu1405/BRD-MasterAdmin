from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, AuditLog

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email','first_name','last_name','role','tenant','is_active')
    list_filter = ('role','is_active','tenant')
    search_fields = ('email','first_name','last_name')
    ordering = ('-created_at',)
    fieldsets = (
        ('Auth', {'fields':('email','password')}),
        ('Personal', {'fields':('first_name','last_name','phone')}),
        ('Org', {'fields':('tenant','branch','role','employee_id')}),
        ('Permissions', {'fields':('is_active','is_staff','is_superuser')}),
    )
    add_fieldsets = ((None, {'classes':('wide',),'fields':('email','password1','password2','first_name','last_name','role')}),)

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user','action_type','module','timestamp','ip_address')
    list_filter = ('action_type','module')
    readonly_fields = ('user','action_type','module','timestamp')

from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'tenant', 'role', 'created_at')
    list_filter = ('tenant', 'role')
    search_fields = ('user__email',)
    readonly_fields = ('created_at',)
