from django.conf.urls import include, url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search-station/$', views.search_station, name='search_station'),
    url(r'^add-station/$', views.add_station, name='add_station'),
]