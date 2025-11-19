from rest_framework.routers import DefaultRouter
from .views import LoanAccountViewSet, RepaymentViewSet, CollectionViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('loanaccounts', LoanAccountViewSet, basename='loanaccount')
router.register('repayments', RepaymentViewSet, basename='repayment')
router.register('collections', CollectionViewSet, basename='collection')

urlpatterns = [
    path('', include(router.urls)),
]
