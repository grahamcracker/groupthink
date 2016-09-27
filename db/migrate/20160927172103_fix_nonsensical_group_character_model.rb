class FixNonsensicalGroupCharacterModel < ActiveRecord::Migration[5.0]
  def change
    remove_column :group_characters, :user_id
    add_reference :group_characters, :character, index: true, foreign_key: true
  end
end
