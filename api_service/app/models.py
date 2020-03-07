from peewee import SqliteDatabase, Model, CharField, DateTimeField, IntegerField

db = SqliteDatabase('data.db')


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField(null=True)
    hw_id = CharField(unique=True)

    def create_user_info_dict(self):
        user_dict = {"username": self.username,
                     "hw_id": self.hw_id,
                     "id": self.id}

        try:
            last_process = ActiveWindow.select().where(ActiveWindow.hw_id == self.hw_id) \
                .order_by(ActiveWindow.id.desc()).get()
            user_dict["mem"] = last_process.mem
            user_dict["cpu"] = last_process.cpu
            user_dict["title"] = last_process.process_title

        except ActiveWindow.DoesNotExist:
            user_dict["mem"] = 0
            user_dict["cpu"] = 0
            user_dict["title"] = "No process"

        return user_dict


class ActiveWindow(BaseModel):
    hw_id = CharField()
    start = DateTimeField()
    end = DateTimeField()
    title = CharField()


class ResourceUsage(BaseModel):
    hw_id = CharField()
    time = DateTimeField()
    cpu = IntegerField()
    mem = IntegerField()


db.create_tables([ActiveWindow, ResourceUsage, User])

