conditionalPsqlCreate () {
  testQuery=$1 thingToCreate=$2 tryMessage=$3
  echo $tryMessage
  if [ $(psql -tAc "SELECT 1 FROM $testQuery") ]; then
    echo "already exists"
  else
    psql -c "CREATE $thingToCreate"
  fi
}


database="identity"
conditionalPsqlCreate \
"pg_database WHERE datname = '$database'" \
"DATABASE $database" \
"creating database $database"
