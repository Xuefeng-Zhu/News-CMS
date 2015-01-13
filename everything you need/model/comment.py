from model import db
from datetime import datetime


class Comment(db.EmbeddedDocument):
    username = db.StringField(required=True)
    content = db.StringField(required=True)
    date = db.DateTimeField(default=datetime.now)
