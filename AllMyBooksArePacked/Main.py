import bookParser 
import fileFinder

class Main(object):
	Parser = bookParser.Parser()

	files = fileFinder.ReadFiles().read()
	for file in files:
		print(file)
  		Parser.parseAll('data/' + file)


