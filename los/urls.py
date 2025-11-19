from rest_framework.routers import DefaultRouter
from .views import LoanApplicationViewSet, KYCDetailViewSet, CreditAssessmentViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('applications', LoanApplicationViewSet, basename='loanapplication')
router.register('kyc', KYCDetailViewSet, basename='kyc')
router.register('assessments', CreditAssessmentViewSet, basename='assessment')

urlpatterns = [
    path('', include(router.urls)),
]
