require 'mina/git'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :domain, 'ghost-go.com'
set :deploy_to, '/var/www/ghost-go.com'
set :repository, 'git@github.com:happybai/ghost-go.git'
set :branch, 'master'

# https://github.com/mina-deploy/mina/issues/99
set :term_mode, nil

# For system-wide RVM install.
#set :rvm_path, '/usr/local/rvm/bin/rvm'
#set :rvm_path, '/home/happybai/.rvm/scripts/rvm'
set :nvm_path, '/home/happybai/.nvm/scripts/nvm'

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['log']

# Optional settings:
set :user, 'happybai'    # Username in the server to SSH to.
#   set :port, '30000'     # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.
#
# set :pm2, "#{deploy_to}/shared/node_modules/pm2/bin"

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .ruby-version or .rbenv-version to your repository.
  # invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use[ruby-2.3.0-p0@default]'
  queue 'echo "-----> Loading nvm"'
  queue %{
    source ~/.nvm/nvm.sh
  }
  queue 'echo "-----> Now using nvm v.`nvm --version`"'

  queue 'export LANGUAGE=en_US.utf8'
  queue 'export LANG=en_US.utf8'
  queue 'export LC_ALL=en_US.utf8'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/log"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/config"]

  if repository
    repo_host = repository.split(%r{@|://}).last.split(%r{:|\/}).first
    repo_port = /:([0-9]+)/.match(repository) && /:([0-9]+)/.match(repository)[1] || '22'

    queue %[
      if ! ssh-keygen -H  -F #{repo_host} &>/dev/null; then
        ssh-keyscan -t rsa -p #{repo_port} -H #{repo_host} >> ~/.ssh/known_hosts
      fi
    ]
  end
end

desc "Deploys the current version to the server."

task :deploy => :environment do
  to :before_hook do
    # Put things to run locally before ssh
  end

  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'deploy:cleanup'
    queue "nvm use node 5.7.0"
    queue "npm install --production"
    queue "./node_modules/.bin/webpack --config webpack.config.production.js"

    to :launch do
      queue "mkdir -p #{deploy_to}/#{current_path}/tmp/"
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end

# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers
