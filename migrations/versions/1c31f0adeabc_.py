"""empty message

Revision ID: 1c31f0adeabc
Revises:
Create Date: 2022-07-12 10:38:48.133866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c31f0adeabc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('friendlist',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('friendId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friendId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'friendId')
    )
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('adminId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['adminId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),

    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('serverId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['serverId'], ['servers.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('serverlists',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('serverId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['serverId'], ['servers.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('userId', 'serverId')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('channelId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('createdate', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['channelId'], ['channels.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('content')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('serverlists')
    op.drop_table('channels')
    op.drop_table('servers')
    op.drop_table('friendlist')
    op.drop_table('users')
    # ### end Alembic commands ###
