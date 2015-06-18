json.array!(@boxes) do |box|
  json.extract! box, :id, :total_weight
  json.url box_url(box, format: :json)
end
