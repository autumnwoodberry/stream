from .models import Station
from .serializers import StationSerializer
from rest_framework import viewsets


class StationViewSet(viewsets.ModelViewSet):

    """API endpoint that allows stations to be viewed or edited."""

    queryset = Station.objects.all()
    serializer_class = StationSerializer
