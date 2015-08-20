import requests

import os
os.environ['DJANGO_SETTINGS_MODULE'] = "stream.settings"

import django
django.setup()

from stations.models import Station

Station.objects.all().delete()

r = requests.get('http://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=co&siteType=ST&siteStatus=active')
data = r.json()

site_names = []

for site in data['value']['timeSeries']:
    name = site['sourceInfo']['siteName']

    # there are duplicate records so don't make a new station unless needed
    if name not in site_names:
        site_names.append(name)

        latitude = site['sourceInfo']['geoLocation']['geogLocation']['latitude']
        longitude = site['sourceInfo']['geoLocation']['geogLocation']['longitude']

        station = Station(name=name, latitude=latitude, longitude=longitude)

        print('adding station', name, latitude, longitude)

        station.save()
