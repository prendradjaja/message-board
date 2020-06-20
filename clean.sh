#!/usr/bin/env bash
set -ex

rm -f database/sqlite3
sqlite3 database/sqlite3 < create-database.sql
touch server.js  # To force a restart to reconnect to new DB
