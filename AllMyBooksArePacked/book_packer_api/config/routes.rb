Rails.application.routes.draw do

resources :boxs, only: [:index]
resources :books, only: [:index]
root 'boxes#index'

end
