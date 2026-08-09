Rails.application.routes.draw do
  root "pages#home"
  post "contact", to: "contacts#create", as: :contact

  get "up" => "rails/health#show", as: :rails_health_check
end