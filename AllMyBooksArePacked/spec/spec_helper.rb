require './lib/parse_pages.rb'

# Enable should and expect syntax
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = [:should, :expect]
  end
end
