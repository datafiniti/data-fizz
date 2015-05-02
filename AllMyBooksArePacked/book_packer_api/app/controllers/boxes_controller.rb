class BoxesController < ApplicationController
  def index
    @boxes = Box.all

    render json: @boxes.as_json(
      :root => true,
      :except => [:created_at, :updated_at]),

    :except => [ :id, :created_at, :updated_at]
  end
end
