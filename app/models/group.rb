# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Group < ApplicationRecord
  has_many :group_characters, dependent: :destroy
  has_many :characters, class_name: 'Character', through: :group_characters, source: :character
  has_many :messages, dependent: :destroy

  def has?(user)
    characters.include?(user.character)
  end
end
