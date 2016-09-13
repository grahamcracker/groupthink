# == Schema Information
#
# Table name: group_characters
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  group_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GroupCharacter < ApplicationRecord
  belongs_to :user
  belongs_to :group
end
