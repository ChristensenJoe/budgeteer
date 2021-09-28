class PaymentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

    def create
        primary_category = @user.categories.find_by(name: params[:primary_category])
        primary_payment = primary_category.payments.create!(payments_params)

        primary_category.category_payments.find_by(payment_id: primary_payment.id).update!(is_primary: true);

        old_balance = primary_category.balance
        primary_category.update!(balance: old_balance + params[:amount].to_d)

        params[:categories].map do |category_name|
            category = @user.categories.find_by(name: category_name)
            category.category_payments.create!(payment_id: primary_payment.id, is_primary: false)
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

    private

    def payments_params
        params.permit(:name, :description, :amount)
    end

    def not_found_response
        render json: { errors: "Category not found" }, status: :not_found
      end
end
