class CategoriesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    categories = @user.categories
    render json: categories, status: :accepted
  end

  def show
    category = @user.categories.find(params[:id])
    render json: category, serializer: CategorySpecificsSerializer, status: :accepted
  end

  def create
    category = @user.categories.create!(category_params)
    render json: category, status: :created
  end

  def update
    category = @user.categories.find(params[:id])
    category.update!(category_params)
    if params[:position]
      render json: category, status: :accepted
    else
      render json: category, serializer: CategorySpecificsSerializer, status: :accepted
    end
  end

  def destroy
    categories = @user.categories.order(position: :asc);
    removed_category = Category.find(params[:id])

    for position in removed_category.position..categories.last.position do
      category_at_position = categories.find { |category| category.position == position}
      category_at_position.update!(position: position-1)
    end
    removed_category.destroy()

    head :no_content
  end

  private

  def category_params
    params.permit(:name, :percentage, :position)
  end

  def not_found_response
    render json: { errors: "Category not found" }, status: :not_found
  end
end
