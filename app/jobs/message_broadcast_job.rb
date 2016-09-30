class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(body, group_id, character_id)
    message = Message.create! body: body, group_id: group_id, character_id: character_id
    ActionCable.server.broadcast "group_channel_#{group_id}", message: render_message(message)
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
