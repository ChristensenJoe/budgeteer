Rails.application.routes.draw do

  resources :users, only: [:update] do
    resources :categories
    resources :payments, only: [:index, :create, :destroy]
    get '/payments/recent', to: 'payments#recent'
  end


  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
