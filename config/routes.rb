Rails.application.routes.draw do

  resources :users, only: [:update] do
    resources :categories
    resources :payments, only: [:create, :destroy, :index]
    get '/payments/recent', to: 'payments#recent'
  end

  resources :categories, only: [] do
    resources :payments, only: [:index]
  end

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
