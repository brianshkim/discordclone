from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .message import seed_messages, undo_messages
from .serverlists import seed_serverlists, undo_serverlists
from .servers import seed_servers, undo_servers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_serverlists()
    seed_channels()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_serverlists()
    undo_channels()
    undo_messages()
    # Add other undo functions here
