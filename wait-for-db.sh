#!/bin/sh

host="$1"
port="$2"
shift 2
cmd="$@"

until pg_isready -h "$host" -p "$port"; do
  >&2 echo "La base de datos está inaccesible - esperando..."
  sleep 1
done

>&2 echo "La base de datos está disponible - ejecutando comando"
exec $cmd
