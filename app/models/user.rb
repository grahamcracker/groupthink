# == Schema Information
#
# Table name: users
#
#  id           :integer          not null, primary key
#  email        :string
#  password     :string
#  character_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class User < ApplicationRecord
  belongs_to :character
  validates :email, presence: true, uniqueness: true
end
