require 'mina/git'
require 'mina/deploy'

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
set :shared_dirs, ['log']
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
  command 'echo "-----> Loading nvm"'
  command %{
    source ~/.nvm/nvm.sh
  }
  command 'echo "-----> Now using nvm v.`nvm --version`"'

  command 'export Lin_directoryANGUAGE=en_US.utf8'
  command 'export LANG=en_US.utf8'
  command 'export LC_ALL=en_US.utf8'
  # yarn
  command 'export PATH="$HOME/.yarn/bin:$PATH"'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task :setup => :environment do
  command %[mkdir -p "#{fetch(:deploy_to)}/#{shared_path}/log"]
  command %[chmod g+rx,u+rwx "#{fetch(:deploy_to)}/#{shared_path}/log"]

  command %[mkdir -p "#{fetch(:deploy_to)}/#{shared_path}/config"]
  command %[chmod g+rx,u+rwx "#{fetch(:deploy_to)}/#{shared_path}/config"]

  if repository
    repo_host = repository.split(%r{@|://}).last.split(%r{:|\/}).first
    repo_port = /:([0-9]+)/.match(repository) && /:([0-9]+)/.match(repository)[1] || '22'

    command %[
      if ! ssh-keygen -H  -F #{repo_host} &>/dev/null; then
        ssh-keyscan -t rsa -p #{repo_port} -H #{repo_host} >> ~/.ssh/known_hosts
      fi
    ]
  end
end

desc "Deploys the current version to the server."

task :deploy => :environment do
  on :before_hook do
    # Put things to run locally before ssh
  end

  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'deploy:cleanup'
    command "nvm use node 7.7.1"
    command "yarn install"
    #command 'sed -i -- "s/<\/body>/<script type=\"text\/javascript\" src=\"\/\/s7.addthis.com\/js\/300\/addthis_widget.js#pubid=ra-5818445a7b592e4c\"><\/script><\/body>/g" dist/index.html'

    on :launch do
      command "mkdir -p #{fetch(:current_path)}/tmp/"
      command "touch #{fetch(:current_path)}/tmp/restart.txt"
    end
  end
end

# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers
