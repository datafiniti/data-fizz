Rails.application.routes.draw do
  resources :books do
    collection do
      get :upload_form
      post :upload
    end
  end
  
  resources :boxes
  
  root to: 'boxes#index'
end
