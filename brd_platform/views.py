from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "status": "success",
        "message": "BRD Platform Backend Running Successfully!",
        "version": "1.0.0"
    })
