class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    if message.save
      redirect_to group_path(message.group), notice: "Your message was sent!"
    else
      redirect_to group_path(message.group), alert: "Your message failed to send!"
    end
  end

  private

  def message_params
   params.fetch(:message, {}).permit(:body, :group_id, :character_id)
  end
end
