from rest_framework import viewsets
from .models import LoanApplication, KYCDetail, CreditAssessment
from .serializers import LoanApplicationSerializer, KYCDetailSerializer, CreditAssessmentSerializer
from users.permissions import DefaultPermission

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [DefaultPermission]

class KYCDetailViewSet(viewsets.ModelViewSet):
    queryset = KYCDetail.objects.all()
    serializer_class = KYCDetailSerializer
    permission_classes = [DefaultPermission]

class CreditAssessmentViewSet(viewsets.ModelViewSet):
    queryset = CreditAssessment.objects.all()
    serializer_class = CreditAssessmentSerializer
    permission_classes = [DefaultPermission]
