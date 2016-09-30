module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', (current_user ? current_user.email : "Anonymous User")
    end

    protected

    def find_verified_user
      if verified_user = env['warden'].user
        verified_user
      else
        nil # non-users can still connect, they just can't speak
      end
    end
  end
end
