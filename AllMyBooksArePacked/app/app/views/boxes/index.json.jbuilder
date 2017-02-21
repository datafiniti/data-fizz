json.boxes @boxes do |box|
  json.partial! 'boxes/box', box: box
end
