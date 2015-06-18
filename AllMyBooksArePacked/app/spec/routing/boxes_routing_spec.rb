require "rails_helper"

RSpec.describe BoxesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/boxes").to route_to("boxes#index")
    end

    it "routes to #new" do
      expect(:get => "/boxes/new").to route_to("boxes#new")
    end

    it "routes to #show" do
      expect(:get => "/boxes/1").to route_to("boxes#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/boxes/1/edit").to route_to("boxes#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/boxes").to route_to("boxes#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/boxes/1").to route_to("boxes#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/boxes/1").to route_to("boxes#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/boxes/1").to route_to("boxes#destroy", :id => "1")
    end

  end
end
