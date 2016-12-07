class MakeUserIdOnMessagesNotNull < ActiveRecord::Migration[5.0]
  def change
    change_column_null :messages, :user_id, false
  end
end
