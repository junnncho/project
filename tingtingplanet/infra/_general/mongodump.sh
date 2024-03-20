#!/bin/bash

URI=$1
DB=$2

mongodump --uri=$URI/$DB
