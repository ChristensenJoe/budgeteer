class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create!(user_params)
    user.set_up_first_user
    session[:user_id] = user.id
    render json: user, include: ['paycheck', 'paycheck.paydates'], status: :created
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user, include: ['paycheck', 'paycheck.paydates'], status: :accepted
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
