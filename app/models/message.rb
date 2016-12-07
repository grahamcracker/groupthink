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

class Message < ApplicationRecord
  belongs_to :character
  belongs_to :user
  belongs_to :group
  validates :body, presence: true

  def as_json(options={})
    options[:only] ||= [:id, :body, :created_at]
    options[:include] ||= {
      character: {
        only: [:name]
      },
      user: {
        only: [:id, :email]
      }
    }
    super
  end
end
