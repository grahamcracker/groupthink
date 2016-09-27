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

require 'test_helper'

class GroupCharacterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
