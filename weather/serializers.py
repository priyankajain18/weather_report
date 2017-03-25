from rest_framework import serializers
from .models import Station


class StationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='s_id')
    text = serializers.SerializerMethodField('get_station_name')

    def get_station_name(self, object):
        return str(object.s_name)+", "+str(object.country)

    class Meta:
        model = Station
        fields = ('id', 'text')