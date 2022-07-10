"""empty message

Revision ID: 32fa311514cf
Revises: 5565efccc453
Create Date: 2022-07-09 15:05:40.867851

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32fa311514cf'
down_revision = '5565efccc453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('messages_channelId_fkey', 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'channels', ['channelId'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key('messages_channelId_fkey', 'messages', 'channels', ['channelId'], ['id'])
    # ### end Alembic commands ###
