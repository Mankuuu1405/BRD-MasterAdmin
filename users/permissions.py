from rest_framework.permissions import BasePermission

class DefaultPermission(BasePermission):
    """
    Default permission for all model ViewSets.
    Allows read to all authenticated users,
    and write only to staff/admin users.
    """
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return request.user.is_authenticated
        return request.user.is_staff or request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return request.user.is_authenticated
        return request.user.is_staff or request.user.is_superuser
