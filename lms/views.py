from rest_framework import viewsets
from .models import LoanAccount, Repayment, Collection
from .serializers import LoanAccountSerializer, RepaymentSerializer, CollectionSerializer
from users.permissions import DefaultPermission

class LoanAccountViewSet(viewsets.ModelViewSet):
    queryset = LoanAccount.objects.all()
    serializer_class = LoanAccountSerializer
    permission_classes = [DefaultPermission]

class RepaymentViewSet(viewsets.ModelViewSet):
    queryset = Repayment.objects.all()
    serializer_class = RepaymentSerializer
    permission_classes = [DefaultPermission]

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [DefaultPermission]
