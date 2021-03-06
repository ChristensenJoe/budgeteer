Rails.application.routes.draw do

  resources :users, only: [:update] do
    member do
      get :confirm_email
    end
    resources :paychecks, only: [:update, :index]
    resources :categories
    resources :payments, only: [:create, :destroy, :index]
    get '/payments/recent', to: 'payments#recent'
  end

  resources :categories, only: [] do
    resources :payments, only: [:index]
  end

  post '/api/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/api/login', to: 'sessions#create'
  delete '/api/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
