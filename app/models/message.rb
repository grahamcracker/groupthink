# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  body         :string
#  character_id :integer
#  group_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ApplicationRecord
  belongs_to :character
  belongs_to :group
  validates :body, presence: true

  def as_json(options={})
    options[:only] ||= [:id, :body]
    options[:include] ||= {character: { only: [:name] }}
    super
  end
end
