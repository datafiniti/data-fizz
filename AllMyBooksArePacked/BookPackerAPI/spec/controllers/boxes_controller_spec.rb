require 'rails_helper'

RSpec.describe BoxesController, :type => :controller do


  describe 'BoxesController' do
    context '#index' do

      before :each do
        get :index
      end

      it 'returns a status of 200 - O.K.' do
        get :index
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it 'displays all the boxes' do
        get :index
        expect(assigns(:boxes)).to eq Box.all
      end

    end
  end
end