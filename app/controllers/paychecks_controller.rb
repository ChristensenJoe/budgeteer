require "Date"

class PaychecksController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
  end

  def update
    paycheck = @user.paycheck
    paycheck.update!(paycheck_params)

    if (params[:paydates].length > 0)
      paycheck.paydates.destroy_all
      params[:paydates].each do |date|
        paydate = Date.parse(date)
        paycheck.paydates.create!(paydate: paydate)
      end
    end
    render json: paycheck, status: :accepted
  end

  private

  def paycheck_params
    params.permit(:amount)
  end

  def not_found_response
    render json: { errors: "Category not found" }, status: :not_found
  end
end
