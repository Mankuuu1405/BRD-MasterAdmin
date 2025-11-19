from rest_framework import serializers
from .models import LoanApplication, KYCDetail, CreditAssessment

class KYCDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = KYCDetail
        fields = '__all__'

class CreditAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditAssessment
        fields = '__all__'

class LoanApplicationSerializer(serializers.ModelSerializer):
    assessment = CreditAssessmentSerializer(read_only=True)
    class Meta:
        model = LoanApplication
        fields = '__all__'
