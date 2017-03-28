import json

from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from .models import Station
from .serializers import StationSerializer
from django.http.response import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


def index(request):
    return render(request, 'weather/index.html')


def search_station(request):
    stations = Station.objects.all()

    return render(request, 'weather/search_station.html', {'stations': stations, 'api_key': settings.API_KEY})


def add_station(request):
    return render(request, 'weather/add_station.html', {'api_key': settings.API_KEY})


@api_view(['POST'])
def add_requested_station(request):
    if request.method == 'POST':
        response = ''
        station = Station.objects.filter(s_id=request.data['id'])
        if not station:
            new_station = Station.objects.create(s_id=request.data['id'], s_name=request.data['name'], country=request.data['sys']['country'])
            response = json.dumps(StationSerializer(new_station).data)
        return Response(response)
    return Response({})
