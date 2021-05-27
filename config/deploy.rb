# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "ghost-go"
set :repo_url, "git@github.com:ghost-go/ghost-go.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/ghost-go"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "app.json"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

append :linked_dirs, "node_modules"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

set :nvm_type, :user
set :nvm_node, 'v14.17.0' # change to your node version number
set :nvm_map_bins, %w[node npm yarn pm2 next]
set :nvm_custom_path, "/home/deploy/.nvm/versions/node"
set :nvm_path, "/home/deploy/.nvm"

namespace :pm2 do
  task :start do
    on roles(:app) do
      within shared_path do
        execute :pm2, "start app.json"
      end
    end
  end

  task :restart do
    on roles(:app) do
      within shared_path do
        execute :pm2, "reload app.json"
      end
    end
  end

  task :stop do
    on roles(:app) do
      within shared_path do
        execute :pm2, "stop app.json"
      end
    end
  end
end

namespace :yarn do
  task :install do
    on roles(:app) do
      within release_path do
        execute :yarn, 'install --frozen-lockfile'
      end
    end
  end

  task :build do
    on roles(:app) do
      within release_path do
        execute :yarn, 'build'
      end
    end
  end
end

namespace :deploy do
  after 'deploy:updated', 'yarn:install'
  after 'deploy:updated', 'yarn:build'
  after 'deploy:publishing', 'deploy:restart'

  task :restart do
    invoke 'pm2:restart'
  end

  task :start do
    invoke 'pm2:start'
  end

  task :stop do
    invoke 'pm2:stop'
  end
end

