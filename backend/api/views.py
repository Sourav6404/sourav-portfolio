from rest_framework import generics
from rest_framework.views import APIView
from django.http import FileResponse, Http404
from django.conf import settings
from .models import Contact
from .serializers import ContactSerializer
import os

class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class DownloadCVView(APIView):
    def get(self, request, *args, **kwargs):
        # CV lives in backend/media/ - works locally and on Render
        cv_path = os.path.join(settings.MEDIA_ROOT, 'Sourav_Kuriakose_CV.pdf')
        if os.path.exists(cv_path):
            response = FileResponse(
                open(cv_path, 'rb'),
                content_type='application/pdf',
                as_attachment=True,
                filename='Sourav_Kuriakose_CV.pdf'
            )
            return response
        raise Http404(f"CV not found at: {cv_path}")
