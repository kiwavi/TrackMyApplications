from django.shortcuts import render
from .models import JobApplications, Entries, ImportantLinks, ContactEmails
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS, IsAdminUser, AllowAny
from .serializers import JobSerializer, EntriesSerializer, LinksSerializer, ContactEmailsSerializer
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404

# Create your views here.

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class WriteOnly(BasePermission):    
    def has_permission(self, request, view):
        WRITE_METHODS = ["POST", ]        
        return (
            request.method in WRITE_METHODS
        )

class AppsFilter(django_filters.FilterSet):
    company = django_filters.CharFilter(lookup_expr='icontains', field_name='company')
    interviewed = django_filters.BooleanFilter(field_name='interviewed')
    feedback = django_filters.CharFilter(lookup_expr='iexact', field_name='final_feedback')
    application = django_filters.CharFilter(field_name='application_portal')
    date_from = django_filters.DateTimeFilter(lookup_expr="gte",field_name='application_date')
    date_to = django_filters.DateTimeFilter(lookup_expr="lte",field_name='application_date')
    
    class Meta:
        model = JobApplications
        fields = ['company','interviewed','final_feedback','application_portal','application_date']


class JobApplicationsView(viewsets.ModelViewSet):
    # view for all job applications
    serializer_class = JobSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AppsFilter
    queryset = JobApplications.objects.all()

class MyJobApplications(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AppsFilter
    queryset = JobApplications.objects.all()
    
    def get_queryset(self):
        queryset = JobApplications.objects.filter(user=self.request.user)
        return queryset


class EntryFilter(django_filters.FilterSet):
    user = django_filters.CharFilter(field_name='user')
    class Meta:
        model = Entries
        fields = ['user']
        
class Entry_Numbers(viewsets.ModelViewSet):
    serializer_class = EntriesSerializer
    permission_classes = [ReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = EntryFilter
    queryset = Entries.objects.all()


class LinksView(viewsets.ModelViewSet):
    serializer_class = LinksSerializer
    permission_classes = [ReadOnly|IsAdminUser]
    queryset = ImportantLinks.objects.all()


class ContactEmailsView(viewsets.ModelViewSet):
    serializer_class = ContactEmailsSerializer
    permission_classes = [WriteOnly|IsAdminUser]  # only admin has all permissions
    queryset = ContactEmails.objects.all()


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})
