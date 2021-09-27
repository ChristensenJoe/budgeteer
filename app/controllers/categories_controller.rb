class CategoriesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
    before_action :find_user


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
        render json: category, serializer: CategorySpecificsSerializer, status: :accepted
    end

    def destroy
        Category.find(params[:id]).destroy
        head :no_content
    end

    private

    def category_params
        params.permit(:name)
    end

    def find_user
        @user = User.find(params[:user_id])
    end

    def not_found_response
        render json: { errors: "Category not found" }, status: :not_found
      end
end
