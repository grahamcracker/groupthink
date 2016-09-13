# == Schema Information
#
# Table name: characters
#
#  id         :integer          not null, primary key
#  name       :string
#  backstory  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Character < ApplicationRecord
  has_one :user
end
