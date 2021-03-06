class PaymentsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def create
    if(params[:primary_category] == "Unallocated Balance" || params[:secondary_category] == "Unallocated Balance")
      if(params[:primary_category] == "Unallocated Balance")
        old_balance = @user.unallocated_balance
        @user.update!(unallocated_balance: old_balance + params[:amount].to_d)

        primary_payment= {
          name: "Unallocated Balance",
          primary_category: "unallocated_balance", 
          amount: params[:amount]
        }

      else
        primary_category = @user.categories.find_by(name: params[:primary_category])
        primary_payment = primary_category.payments.create!(payments_params)
    
        primary_category.category_payments.find_by(payment_id: primary_payment.id).update!(is_primary: true)
    
        old_balance = primary_category.balance
        primary_category.update!(balance: old_balance + params[:amount].to_d)
      end
    else
      primary_category = @user.categories.find_by(name: params[:primary_category])
      primary_payment = primary_category.payments.create!(payments_params)
  
      primary_category.category_payments.find_by(payment_id: primary_payment.id).update!(is_primary: true)
  
      old_balance = primary_category.balance
      primary_category.update!(balance: old_balance + params[:amount].to_d)

      if params[:categories]
        params[:categories].map do |category_name|
          category = @user.categories.find_by(name: category_name)
          category.category_payments.create!(payment_id: primary_payment.id, is_primary: false)
        end
      end
    end

    render json: primary_payment, status: :created
  end

  def destroy
    payment = @user.payments.find(params[:id])
    category = payment.category_payments.find_by(is_primary: true).category
    old_balance = category.balance
    category.update!(balance: old_balance - payment.amount)

    payment.destroy
    head :no_content
  end

  def index
    payments = @user.payments.order(created_at: :desc).uniq
    render json: payments, status: :accepted
  end

  def recent
    ordered_payments = @user.payments.where.not(name: "Money Transfer").order(created_at: :desc).uniq.slice(0, 5)
    render json: ordered_payments, each_serializer: RecentPaymentsSerializer, status: :accepted
  end

  private

  def payments_params
    params.permit(:name, :description, :amount)
  end

  def not_found_response
    render json: { errors: "Category not found" }, status: :not_found
  end
end
