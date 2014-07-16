require 'ostruct'

module DF
  class Command
    # Convenience method that lets us call `.run` directly on the class
    def self.run(*inputs)
      self.new.run(*inputs)
    end

    def failure(error, data={})
      CommandFailure.new(data.merge :error => error)
    end

    def success(data={})
      CommandSuccess.new(data)
    end
  end

  class CommandFailure < OpenStruct
    def success?
      false
    end
  end


  class CommandSuccess < OpenStruct
    def success?
      true
    end
  end
end