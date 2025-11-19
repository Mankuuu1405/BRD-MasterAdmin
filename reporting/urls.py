from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, AnalyticsViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('reports', ReportViewSet, basename='report')
router.register('analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [ ]
    