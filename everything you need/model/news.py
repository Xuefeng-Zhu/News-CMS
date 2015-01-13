from model import db
from model.comment import Comment
from datetime import datetime


class News(db.Document):
    title = db.StringField(max_length=120, unique=True)
    date = db.DateTimeField(default=datetime.now)
    abstract = db.StringField(max_length=200)
    news_pic = db.URLField()
    content = db.StringField()
    comments = db.ListField(db.EmbeddedDocumentField(Comment))
    tags = db.ListField(db.StringField(max_length=30))
    news_views = db.IntField(default=0)
