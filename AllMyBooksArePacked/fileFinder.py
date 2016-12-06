import os, sys

class ReadFiles:

	def read(self):
		# To edit folder that html is stored in, change "/data" to /[FOLDERNAME]. 
		# If html documents are in same folder as program, change "/data" to ""
		path = os.getcwd() + "/data"
		dirs = os.listdir( path )
		return dirs

