class User < ApplicationRecord
    has_secure_password
    validates :username, :email, :password_confirmation, presence: true
    validates :username, :email, uniqueness: true
end
