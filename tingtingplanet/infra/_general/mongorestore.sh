#!/bin/bash
URI=$1
DB=$2
DROP=$3
mongorestore --uri=$URI/$DB $DROP