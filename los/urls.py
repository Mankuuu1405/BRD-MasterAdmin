# los/urls.py
from rest_framework.routers import DefaultRouter
from .views import LoanApplicationViewSet

router = DefaultRouter()
router.register(r'applications', LoanApplicationViewSet, basename='applications')

urlpatterns = router.urls
