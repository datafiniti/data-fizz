class Api::ShipmentsController < ApplicationController
  def index
    @boxes = Box.all.includes(:books)
  end
end
