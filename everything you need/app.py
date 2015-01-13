from flask import Flask
from flask.ext.restful import Api
from flask.ext.restful.utils import cors
from model import db, redis_store
from api.userAPI import LoginAPI, UserAPI
from api.newsAPI import (NewsAPI, NewsImageAPI,
                         NewsThumbnailAPI, NewsListAPI, SearchNewsAPI)
from api.commentAPI import CommentAPI
from api.feedAPI import ArticleAPI
from util import cache


app = Flask(__name__, static_url_path='')
app.config.from_object('config')

db.init_app(app)
redis_store.init_app(app)
cache.init_app(app)

api = Api(app)
api.decorators = [cors.crossdomain(origin='*', headers=
                                   'my-header, accept, content-type, token')]

api.add_resource(UserAPI, '/create_user')
api.add_resource(LoginAPI, '/login')

api.add_resource(NewsAPI, '/news')
api.add_resource(NewsImageAPI, '/upload_news_image')
api.add_resource(NewsThumbnailAPI, '/upload_news_thumbnail')
api.add_resource(NewsListAPI, '/news_list/<string:tags>/<int:page>')
api.add_resource(SearchNewsAPI, '/search_news')

api.add_resource(CommentAPI, '/comment')

api.add_resource(ArticleAPI, '/load_article/<path:link>')


if __name__ == '__main__':
    app.run(debug=True)
