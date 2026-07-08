from django.urls import path
from .views import ContactCreateView, DownloadCVView

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('download-cv/', DownloadCVView.as_view(), name='download-cv'),
]
