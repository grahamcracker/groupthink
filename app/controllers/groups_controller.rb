class GroupsController < ApplicationController
  before_action :set_group, except: [:index]
  before_action :authenticate_user!, only: [:join]

  def index
    @groups = Group.all
  end

  def show
  end

  def join
    gc = @group.group_characters.new(character: current_user.character)
    if gc.save
      redirect_to group_path(@group), notice: "Your character joined #{@group.name}."
    else
      redirect_to group_path(@group), alert: "Problem joining group!"
    end
  end

  def leave
    @group.group_characters.where(character: current_user.character).destroy_all
    redirect_to group_path(@group), notice: "Your character left #{@group.name}."
  end

  def older_messages
    render json: @group.messages.where('created_at < ?', params[:older_time]).limit(60)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id] || params[:group_id])
    end
end
