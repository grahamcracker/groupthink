# == Schema Information
#
# Table name: characters
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  backstory  :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Character < ApplicationRecord
  has_one :user
  has_many :messages
  has_many :groups, through: :group_characters

  validates_presence_of :name, :backstory

  def as_json(options={})
    options[:only] ||= [:id, :name]
    super
  end
end
