from models import BookParser, Shipment
import os
import glob
import json


def parse_files(directory, results):
    for file in directory:
        working_file = open(file, "r", encoding="ISO-8859-1")
        parser = BookParser()
        parser.feed(working_file.read())
        parser.finalize(results)


def main():
    results = []
    os.chdir("data")
    directory = glob.glob("*.html")
    parse_files(directory, results)
    ship = Shipment()
    ship.create_from(results)
    print(json.dumps(ship, default=lambda o: o.__dict__, indent=4))

if __name__ == "__main__":
    main()