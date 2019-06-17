#!/usr/bin/python2.7

from __future__ import print_function

import pygrib
import os
import numpy as np
import tempfile
import urllib
import tarfile
import shutil
import csv

from datetime import datetime
from datetime import timedelta


KNMI_BASE_URL = "ftp://data.knmi.nl/download/harmonie_arome_cy40_p1/0.2/noversion/0000/00/00"


class GribStore:

    def update(self):
        base = os.path.join(self.tmp, "grbs")
        harmonie = os.path.join(base, "harmonie.tar")
        h = datetime.now().hour

        if h <= 6:
            url = "{}/harm40_v1_p1_00.tar".format(KNMI_BASE_URL)
        elif h <= 12:
            url = "{}/harm40_v1_p1_06.tar".format(KNMI_BASE_URL)
        elif h <= 18:
            url = "{}/harm40_v1_p1_12.tar".format(KNMI_BASE_URL)
        else:
            url = "{}/harm40_v1_p1_18.tar".format(KNMI_BASE_URL)

        if os.path.exists(base):
            shutil.rmtree(base)

        # start fresh
        os.makedirs(base)
        urllib.urlretrieve(url, os.path.join(base, harmonie))
        tar = tarfile.open(harmonie)
        tar.extractall(path=base)
        tar.close()

        files = os.listdir(base)
        self.files = [os.path.join(base, _) for _ in files if _ != "harmonie.tar"]


    def get_value(self, param, hour, latitude, longitude):
        for f in self.files:
            grbs = pygrib.open(f)

            grb = next(grbs)
            if int(grb.validityTime / 100) != hour:
                continue

            for grb in grbs:
                if not grb.parameterName == param:
                    continue

                griblat = grb.latitudeOfFirstGridPointInDegrees
                griblon = grb.longitudeOfFirstGridPointInDegrees

                grbdate = grb.dataDate
                grbhour = grb.validityTime / 100

                data = grb.values
                coords = grb.latlons()

                y = np.searchsorted(coords[0][:, 0], latitude, side="left")
                x = np.searchsorted(coords[1][0], longitude, side="left")

                return data[y][x]


    def destroy(self):
        base = os.path.join(self.tmp, "grbs")

        if os.path.exists(base):
            shutil.rmtree(base)


    def __init__(self):
        self.tmp = tempfile.mkdtemp()
        self.files = []
        self.update()


try:
    gribStore = GribStore()

    latitude = 52.35263
    longitude = 4.94863

    # Time ranges
    h0 = datetime.now() - timedelta(hours=1)
    h1 = datetime.now()
    h2 = datetime.now() + timedelta(hours=1)
    h3 = datetime.now() + timedelta(hours=2)
    h4 = datetime.now() + timedelta(hours=3)
    h5 = datetime.now() + timedelta(hours=4)
    h6 = datetime.now() + timedelta(hours=5)

    # Irradiance
    i0 = int(gribStore.get_value("117", h0.hour, latitude, longitude))
    i1 = int(gribStore.get_value("117", h1.hour, latitude, longitude))
    i2 = int(gribStore.get_value("117", h2.hour, latitude, longitude))
    i3 = int(gribStore.get_value("117", h3.hour, latitude, longitude))
    i4 = int(gribStore.get_value("117", h4.hour, latitude, longitude))
    i5 = int(gribStore.get_value("117", h5.hour, latitude, longitude))
    i6 = int(gribStore.get_value("117", h6.hour, latitude, longitude))

    # Subtract from accums
    ii1 = (i1 - int(i0)) / 3600.0
    ii2 = (i2 - int(i1)) / 3600.0
    ii3 = (i3 - int(i2)) / 3600.0
    ii4 = (i4 - int(i3)) / 3600.0
    ii5 = (i5 - int(i4)) / 3600.0
    ii6 = (i6 - int(i5)) / 3600.0

    # Temperature
    t0 = float(gribStore.get_value("11", h0.hour, latitude, longitude))
    t1 = float(gribStore.get_value("11", h1.hour, latitude, longitude))
    t2 = float(gribStore.get_value("11", h2.hour, latitude, longitude))
    t3 = float(gribStore.get_value("11", h3.hour, latitude, longitude))
    t4 = float(gribStore.get_value("11", h4.hour, latitude, longitude))
    t5 = float(gribStore.get_value("11", h5.hour, latitude, longitude))
    t6 = float(gribStore.get_value("11", h6.hour, latitude, longitude))

    t1 -= 273.15
    t2 -= 273.15
    t3 -= 273.15
    t4 -= 273.15
    t5 -= 273.15
    t6 -= 273.15

    # Cloud cover
    c0 = float(gribStore.get_value("71", h0.hour, latitude, longitude))
    c1 = float(gribStore.get_value("71", h1.hour, latitude, longitude))
    c2 = float(gribStore.get_value("71", h2.hour, latitude, longitude))
    c3 = float(gribStore.get_value("71", h3.hour, latitude, longitude))
    c4 = float(gribStore.get_value("71", h4.hour, latitude, longitude))
    c5 = float(gribStore.get_value("71", h5.hour, latitude, longitude))
    c6 = float(gribStore.get_value("71", h6.hour, latitude, longitude))

    print("Irradiance (raw):")
    print(i1, i2, i3, i4, i5, i6)
    print()

    print("Irradiance:")
    print(ii1, ii2, ii3, ii4, ii5, ii6)
    print()

    print("Temperature:")
    print(t1, t2, t3, t4, t5, t6)
    print()

    print("Cloud:")
    print(c1, c2, c3, c4, c5, c6)
    print()

    with open("weather.csv", "w") as fout:
        csvwriter = csv.writer(fout)
        csvwriter.writerow([h1.hour, ii1, t1, c1])
        csvwriter.writerow([h2.hour, ii2, t2, c2])
        csvwriter.writerow([h3.hour, ii3, t3, c3])
        csvwriter.writerow([h4.hour, ii4, t4, c4])
        csvwriter.writerow([h5.hour, ii5, t5, c5])
        csvwriter.writerow([h6.hour, ii6, t6, c6])

except Exception as e:
    print(e)
finally:
    gribStore.destroy()


