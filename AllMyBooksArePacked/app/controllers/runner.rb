get '/' do
  content_type :json
  @boxes = Box.all
  @boxes.to_json(:include => [:books])
end
