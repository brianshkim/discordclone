"""empty message

Revision ID: b6c349aa4a2d
Revises: 1c31f0adeabc
Create Date: 2022-07-13 15:10:21.619666

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6c349aa4a2d'
down_revision = '1c31f0adeabc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('servers_name_key', 'servers', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('servers_name_key', 'servers', ['name'])
    # ### end Alembic commands ###