# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GroupChannel < ApplicationCable::Channel
  def subscribed
    stream_from "group_channel_#{params['group_id']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    if current_user
      MessageBroadcastJob.perform_later data['message'], data['group_id'], current_user.character.id, current_user.id
    end
  end
end
