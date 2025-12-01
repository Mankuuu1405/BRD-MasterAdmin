from rest_framework import viewsets, permissions
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class IsTenantAdminOrMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated, IsTenantAdminOrMaster]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_queryset(self):
        user = getattr(self.request,"user",None)
        if user and (getattr(user,"role",None)=="MASTER_ADMIN" or user.is_superuser):
            return User.objects.all()
        if user and user.tenant:
            return User.objects.filter(tenant=user.tenant)
        return User.objects.none()

    def perform_create(self, serializer):
        user = getattr(self.request,"user",None)
        if user and (getattr(user,"role",None)!="MASTER_ADMIN" and not user.is_superuser):
            serializer.save(tenant=user.tenant)
        else:
            serializer.save()

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
