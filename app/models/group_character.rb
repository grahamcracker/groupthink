# == Schema Information
#
# Table name: group_characters
#
#  id           :integer          not null, primary key
#  group_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  character_id :integer
#

class GroupCharacter < ApplicationRecord
  belongs_to :character
  belongs_to :group
end
