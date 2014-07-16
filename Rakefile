require 'active_record_tasks'

ActiveRecordTasks.configure do |config|
  # These are all the default values
  config.db_dir = 'db'
  config.db_config_path = 'db/config.yml'
  config.env = 'test'
end
# Run this AFTER you've configured
ActiveRecordTasks.load_tasks

Rake::Task["db:seed"].clear

namespace :db do
  task :seed do
    require './db/seeds.rb'
  end
end
