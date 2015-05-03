class BoxesController < ApplicationController

  #route returns a JSON object of all the boxes and their contents
  def index
    @boxes = Box.all

    render json: @boxes.as_json(
      :root => true,
      :except => [:created_at, :updated_at]),

      :except => [ :id, :created_at, :updated_at]
  end

end
