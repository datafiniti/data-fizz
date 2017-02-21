Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    get 'shipments', to: 'shipments#index'
  end
end
