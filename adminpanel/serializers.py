from rest_framework import serializers
from .models import LoanProduct, ChargeMaster, DocumentType, NotificationTemplate, RoleMaster

class LoanProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanProduct
        fields = "__all__"


class ChargeMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChargeMaster
        fields = "__all__"


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = "__all__"


class NotificationTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationTemplate
        fields = "__all__"


class RoleMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleMaster
        fields = "__all__"
