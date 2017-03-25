from django.db import models


class Station(models.Model):
    s_id = models.IntegerField(unique=True)
    s_name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

    def __unicode__(self):
        return str(self.s_id)
