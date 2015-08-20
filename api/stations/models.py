from django.db import models


class Station(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=11, decimal_places=7)
    longitude = models.DecimalField(max_digits=11, decimal_places=7)
