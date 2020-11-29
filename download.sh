#!/bin/bash

curl -L0 https://github.com/openfisca/openfisca-france/archive/master.zip --output master.zip
unzip master.zip "openfisca-france-master/openfisca_france/model/*" -d .
mv openfisca-france-master/openfisca_france/model model
rm -r openfisca-france-master
rm master.zip
