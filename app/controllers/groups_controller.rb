class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :join, :leave]
  before_action :authenticate_user!, only: [:join]

  def index
    @groups = Group.all
  end

  def show
    @message = Message.new
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id] || params[:group_id])
    end
end
