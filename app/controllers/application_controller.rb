class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  include ActionController::Cookies
  before_action :authorize

  private

  def unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def not_found_response
    render json: { errors: "not found" }, status: :not_found
  end

  def authorize
    @user = User.find_by(id: session[:user_id])
    return render json: { errors: ["Not Authorized"] }, status: :unauthorized unless @user
  end
end