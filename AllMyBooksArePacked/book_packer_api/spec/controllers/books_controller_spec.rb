require 'rails_helper'

RSpec.describe BooksController, :type => :controller do


  describe 'BooksController' do
    context '#index' do

      before :each do
        get :index
      end

      it 'returns a status of 200 - O.K.' do
        get :index
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it 'displays all the books' do
        get :index
        expect(assigns(:books)).to eq Book.all
      end

    end
  end
end