class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(body, group_id, character_id)
    message = Message.create! body: body, group_id: group_id, character_id: character_id
    ActionCable.server.broadcast "group_channel_#{group_id}", message: message
  end
end
