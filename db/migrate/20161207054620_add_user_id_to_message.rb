class AddUserIdToMessage < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :user, index: true, foreign_key: true
  end
end
