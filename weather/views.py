import json

from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from .models import Station
from .serializers import StationSerializer


def index(request):
    stations = Station.objects.all()
    serializer = StationSerializer(stations, many=True)

    return render(request, 'index.html', {'stations': stations, 'api_key': settings.API_KEY})