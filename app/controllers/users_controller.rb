class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :confirm_email]

  def create
    user = User.create!(user_params)
    UserMailer.registration_confirmation(user).deliver
    user.set_up_first_user
    session[:user_id] = user.id
    # render json: user, include: ['paycheck', 'paycheck.paydates'], status: :created
    render json: { status: ["Confirm Email"]}, status: :created
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user, include: ['paycheck', 'paycheck.paydates'], status: :accepted
  end

  def confirm_email
    user = User.find_by_confirm_token(params[:id])
    if user
      user.email_activate
      
      redirect_to "https://budgeteer-finance.herokuapp.com"
    else
      redirect_to "https://budgeteer-finance.herokuapp.com"
    end
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
