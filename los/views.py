# los/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import LoanApplication, KYCDetail, CreditAssessment
from .serializers import LoanApplicationSerializer, KYCDetailSerializer, CreditAssessmentSerializer

class LoanApplicationViewSet(viewsets.ModelViewSet):
    """
    CRUD for LoanApplication + custom actions:
      - upload_kyc
      - submit
      - assess (create/update credit assessment)
      - approve / reject
      - disburse
    """
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Auto-set created_by if available
        user = getattr(self.request, 'user', None)
        serializer.save(created_by=user)

    @action(detail=True, methods=['post'])
    def upload_kyc(self, request, pk=None):
        app = self.get_object()
        data = request.data.copy()
        data['loan_application'] = app.id
        serializer = KYCDetailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        app = self.get_object()
        if app.status != 'NEW':
            return Response({'detail': 'Only NEW applications can be submitted.'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = 'SUBMITTED'
        app.save()
        return Response({'detail': 'Application submitted', 'status': app.status})

    @action(detail=True, methods=['post'])
    def assess(self, request, pk=None):
        """
        Create or update CreditAssessment for this application.
        Expected payload: { "score": 650, "remarks": "...", "status": "APPROVED", "approved_limit": 50000 }
        """
        app = self.get_object()
        payload = request.data
        try:
            ca = app.credit_assessment
            serializer = CreditAssessmentSerializer(ca, data=payload, partial=True)
        except CreditAssessment.DoesNotExist:
            payload['application'] = app.id
            serializer = CreditAssessmentSerializer(data=payload)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        app = self.get_object()
        if app.status not in ['SUBMITTED', 'UNDER_REVIEW']:
            return Response({'detail': 'Only SUBMITTED/UNDER_REVIEW apps can be approved.'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = 'APPROVED'
        app.save()
        return Response({'detail': 'Application approved', 'status': app.status})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        app = self.get_object()
        app.status = 'REJECTED'
        app.save()
        return Response({'detail': 'Application rejected', 'status': app.status})

    @action(detail=True, methods=['post'])
    def disburse(self, request, pk=None):
        app = self.get_object()
        if app.status != 'APPROVED':
            return Response({'detail': 'Only APPROVED applications can be disbursed.'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = 'DISBURSED'
        app.save()
        # (LMS: you may create a LoanAccount here in a later step)
        return Response({'detail': 'Loan disbursed', 'status': app.status})
