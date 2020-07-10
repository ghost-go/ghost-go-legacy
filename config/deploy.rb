# config valid for current version and patch releases of Capistrano
lock "~> 3.14.0"

set :application, "ghost-go"
set :repo_url, "git@github.com:BAI-Bonjwa/ghost-go.git"

# append :linked_files, ".env"
append :linked_dirs, "node_modules"

set :ssh_options, {
  verify_host_key: :always,
  forward_agent: true
}

set :nvm_type, :user
set :nvm_node, 'v14.3.0'
set :nvm_map_bins, %w{node npm yarn}

set :yarn_flags, %w(--slient --no-progress)

set :deploy_to, "/home/deploy/ghost-go"

namespace :deploy do
  desc 'Sycning local build to server'

  task :yarn_deploy do
    on roles fetch(:yarn_roles) do |role|
      run_locally do
        execute "yarn build"
      end
      run_locally do
        execute "rsync -avr -e ssh build #{role.username}@#{role.hostname}:#{release_path}/"
      end
    end
  end

  # before "symlink:release", :build
  before "symlink:release", :yarn_deploy
  # before "symlink:release", :sync
end

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
