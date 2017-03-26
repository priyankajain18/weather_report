from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from .models import Station
from .serializers import StationSerializer


def index(request):
    return render(request, 'weather/index.html')


def search_station(request):
    stations = Station.objects.all()
    serializer = StationSerializer(stations, many=True)

    return render(request, 'weather/search_station.html', {'stations': stations, 'api_key': settings.API_KEY})


def add_station(request):
    return render(request, 'weather/add_station.html')