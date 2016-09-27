Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "groups#index"

  devise_for :users
  resources :characters do
    post :become
  end
  resources :groups, only: [:show] do
    post :join, :leave
  end
end
