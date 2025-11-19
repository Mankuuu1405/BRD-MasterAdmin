from django.db import models
from tenants.models import Tenant


class APIIntegration(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    provider = models.CharField(max_length=100, blank=True)  # e.g. "KYC_VENDOR_A"
    base_url = models.URLField()
    auth_token = models.CharField(max_length=255, blank=True)
    headers_json = models.JSONField(default=dict, blank=True)

    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'api_integrations'
        ordering = ['name']

    def __str__(self):
        return self.name


class WebhookLog(models.Model):
    integration = models.ForeignKey(APIIntegration, on_delete=models.CASCADE, related_name='webhook_logs')
    event_type = models.CharField(max_length=100, blank=True)
    payload = models.JSONField(default=dict, blank=True)
    received_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'webhook_logs'
        ordering = ['-received_at']

    def __str__(self):
        return f"{self.integration.name} - {self.event_type}"
