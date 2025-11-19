from django.contrib import admin
from .models import APIIntegration, WebhookLog


@admin.register(APIIntegration)
class APIIntegrationAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant', 'provider', 'active', 'created_at')
    list_filter = ('tenant', 'provider', 'active')
    search_fields = ('name', 'provider')
    readonly_fields = ('created_at',)


@admin.register(WebhookLog)
class WebhookLogAdmin(admin.ModelAdmin):
    list_display = ('integration', 'event_type', 'received_at')
    list_filter = ('integration', 'event_type', 'received_at')
    search_fields = ('event_type',)
    readonly_fields = ('received_at',)
