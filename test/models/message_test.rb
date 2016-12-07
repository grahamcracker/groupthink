# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  body         :string(255)
#  character_id :integer
#  group_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
