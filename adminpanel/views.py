from rest_framework import viewsets
from .models import LoanProduct, ChargeMaster, DocumentType, NotificationTemplate, RoleMaster
from .serializers import (
    LoanProductSerializer,
    ChargeMasterSerializer,
    DocumentTypeSerializer,
    NotificationTemplateSerializer,
    RoleMasterSerializer,
)

class LoanProductViewSet(viewsets.ModelViewSet):
    queryset = LoanProduct.objects.all()
    serializer_class = LoanProductSerializer


class ChargeMasterViewSet(viewsets.ModelViewSet):
    queryset = ChargeMaster.objects.all()
    serializer_class = ChargeMasterSerializer


class DocumentTypeViewSet(viewsets.ModelViewSet):
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer


class NotificationTemplateViewSet(viewsets.ModelViewSet):
    queryset = NotificationTemplate.objects.all()
    serializer_class = NotificationTemplateSerializer


class RoleMasterViewSet(viewsets.ModelViewSet):
    queryset = RoleMaster.objects.all()
    serializer_class = RoleMasterSerializer
