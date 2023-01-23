from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter
from .views import JobApplicationsView, MyJobApplications, Entry_Numbers, LinksView

router = DefaultRouter()
router.register("applications", JobApplicationsView, basename="applications")
router.register("myapplications", MyJobApplications, basename="myapplications")
router.register("entries", Entry_Numbers, basename="entries")
router.register("links", LinksView, basename="links")

applications_urlpatterns = [
    re_path(r'^api/', include(router.urls)),
]
