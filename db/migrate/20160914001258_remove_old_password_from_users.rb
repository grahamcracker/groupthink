class RemoveOldPasswordFromUsers < ActiveRecord::Migration[5.0]
  def change
    # this is no longer needed since devise uses "encrypted_password" as the column name
    remove_column :users, :password
  end
end
