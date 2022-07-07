"""empty message

Revision ID: 2d80677c8af5
Revises: 8f609d696184
Create Date: 2022-07-06 10:10:56.602234

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d80677c8af5'
down_revision = '8f609d696184'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('channels', sa.Column('userId', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'channels', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'channels', type_='foreignkey')
    op.drop_column('channels', 'userId')
    # ### end Alembic commands ###
