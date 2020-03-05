from peewee import SqliteDatabase, Model, CharField, DateTimeField, IntegerField

db = SqliteDatabase('data.db')


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField(null=True)
    hw_id = CharField(unique=True)


class ProcessActivity(BaseModel):
    hw_id = CharField()
    start = DateTimeField()
    end = DateTimeField()
    mem = IntegerField()
    process_title = CharField()


db.create_tables([ProcessActivity, User])

