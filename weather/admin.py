from django.contrib import admin
from .models import Station


class StationAdmin(admin.ModelAdmin):
    list_display = ('s_id', 's_name', 'country')
    search_fields = ('s_id', 's_name', 'country')


admin.site.register(Station, StationAdmin)

