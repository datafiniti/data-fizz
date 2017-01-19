get '/' do
  content_type :json
  @boxes = Box.all
  @json_boxes = JSON[@boxes.to_json(:include => [:books])]
  JSON.pretty_generate(@json_boxes)
end
