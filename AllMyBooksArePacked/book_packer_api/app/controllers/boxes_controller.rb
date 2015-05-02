class BoxesController < ApplicationController
  def index
    @boxes = Box.all
    render json: Box.all.as_json(
      :root => true,
      :except => [:created_at, :updated_at]),

    :except => [ :box_id, :created_at, :updated_at]
  end
end
