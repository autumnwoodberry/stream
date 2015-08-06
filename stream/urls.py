from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers
router = routers.DefaultRouter()

from stations import views
router.register(r'stations', views.StationViewSet)

urlpatterns = [
    url(r'^', include('visualizer.urls', namespace='visualizer')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
]
