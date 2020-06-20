#!/usr/bin/env bash
set -ex

sqlite3 database/sqlite3 <<SQL

  SELECT timestamp, author, body
  FROM messages
  ORDER BY timestamp ASC
  ;

SQL
