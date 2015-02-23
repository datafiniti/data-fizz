from models import BookParser, Shipment, Encoder
import os, glob, time

results = []
start = time.time()
os.chdir("data")


def parse_files(directory):
    for file in directory:
        working_file = open(file, "r", encoding="ISO-8859-1")
        parser = BookParser()
        parser.feed(working_file.read())
        parser.finalize(results)


directory = glob.glob("*.html")
parse_files(directory)
ship = Shipment()
results = ship.create_from(results)
print(Encoder().encode(ship))
