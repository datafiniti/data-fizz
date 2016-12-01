import os, sys

class ReadFiles:

	def read(self):
		path = os.getcwd() + "/data"
		dirs = os.listdir( path )
		return dirs

