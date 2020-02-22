from peewee import SqliteDatabase, Model, CharField, DateTimeField, IntegerField

db = SqliteDatabase('data.db')


class BaseModel(Model):
    class Meta:
        database = db


class ProcessActivity(BaseModel):
    hw_id = CharField()
    start = DateTimeField()
    end = DateTimeField()
    process_name = CharField()
    process_title = CharField()


class ResourceUsage(BaseModel):
    hw_id = CharField()
    time = DateTimeField()
    cpu = IntegerField()
    mem = IntegerField()


db.create_tables([ProcessActivity, ResourceUsage])
