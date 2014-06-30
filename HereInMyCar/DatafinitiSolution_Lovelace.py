import requests
import urllib
import json
from pandas import DataFrame
import pandas as pd
import pymysql
import zipfile
from os import listdir

# Database connection info
h="localhost"
p=3306
u="ross"
pw="forty-two"

def dffetch(api_key, payload, name):
  r = requests.get("https://{0}:@api.datafiniti.net/v2/data/products/download".format(api_key), params=payload)
  r2 = requests.get("https://{0}:@api.datafiniti.net/v2/status/sgysmrb1qf0ewbfv".format(api_key))
  j1 = json.loads(r2.text)
  urllib.urlretrieve(j1['url'], "{0}.zip".format(name))
  with zipfile.ZipFile("{0}.zip".format(name), 'r') as z:
    z.extractall("./{0}/".format(name))

api_key = "br1nkqdymerrvaknqpddq5z09y2gfzmt"
payload = {
  'q'   : "dateUpdated:[2014-03-01 TO *] AND vin:['' TO *]",
  'view': "product_json", 
}
dffetch(api_key, payload, "autos")

auto_data = []

for file in listdir("./autos/"):
  jdata = json.load(open("./autos/" + file))
  jdata = jdata['records']
  auto_data.extend(jdata)

# Get only the autos with price elements
autos_with_prices = [rec for rec in auto_data if 'price' in rec]

prices = []

for rec in autos_with_prices:
  aprices = DataFrame(rec['price'])
  aprices['vin'] = rec['key']
  prices.append(aprices)

prices = pd.concat(prices, ignore_index = True)

# Remove null price amounts
prices = prices[prices['amount'].notnull()]

c = ['currency', 'amount_num']
c.extend(list('cdefgh'))

# Separate the currency and amount elements. Extra columns (c-h) added
# to accomodate invalid records.
s = DataFrame(prices['amount'].str.split().tolist(), columns=c, index=prices['vin'])

# Remove extra columns
s = s[['currency', 'amount_num']]

# Remove commas from amounts for database insert into float field
# Then join the split prices back on the vin.
s['amount_num'] = s['amount_num'].str.replace(',', '')
prices = pd.merge(prices, s, left_on='vin', right_index=True)

# Filter down to "USD" prices only, then convert to float
prices = prices[prices['currency']=="USD"]
prices.loc[:,'amount_num'] = prices['amount_num'].astype(float)

# Read in autos with states. For simplicity this only looks at the first merchant record
# to find the state code. A final version would iterate if 'merchant' had no 'province' element.
autos = []

for rec in auto_data:
    astates = [rec['key']]
    if rec.get('merchant') != None:
        astates.append(rec['merchant'][0].get('province'))
    else:
        astates.append(None)
    # astates.append(rec['merchant'][0]['province'])
    astates.append(rec.get('name'))
    astates.append(rec.get('manufacturer'))
    autos.append(astates)

#Connect to the database
conn = pymysql.connect(host=h, port=p, user=u, passwd=pw)
curs = conn.cursor()

def createdb:
  curs.execute("create database TestAuto")
  curs.execute("use TestAuto")

  curs.execute(
    """create table Autos (
          vin   varchar(1000)
        , state varchar(255)
        , name  varchar(255)
        , make  varchar(255)
    )
    """)

  curs.execute(
    """create table AutoPrices (
          vin varchar(1000)
        , price float
    )

    """
    )

createdb()
curs.execute("use TestAuto")
# curs.execute("truncate table AutoPrices")
# curs.execute("truncate table Autos")

price_insert = prices.loc[:, ['vin','amount_num']] # We only need vin and amount
# Inserts below
curs.executemany(
  """insert into AutoPrices (vin, price)
    values (%s, %s)""",
  map(list, price_insert.values)
  )
conn.commit()

curs.executemany(
  """insert into Autos (vin, state, name, make)
    values (%s, %s, %s, %s)""",
  autos
  )
conn.commit()

# Read query into new DataFrame with state as index.
# This ignores prices of 0 and states that are not two characters or null.
# Takes the average price per vin, if multiple prices are present;
# an alternate approach would be to take the most recent price.
# Note: I would normally store the SQL in its own file, but I thought this
# would be a clearer.
df_result = pd.io.sql.read_sql(
  """select
    a.state
  , format(
      avg(ap.avgByAuto)
    , 2
    ) avgByState
  from Autos a
    join (
      select 
        vin
      , avg(price) avgByAuto
      from
        AutoPrices
      where price <> 0
      group by vin
        ) ap
      on ap.vin = a.vin
  where (length(state) = 2 or state is null)
  group by state
  order by avg(ap.avgByAuto)"""
  ,con = conn
  )

print df_result # See iPython Notebook for prettier result and graph.
