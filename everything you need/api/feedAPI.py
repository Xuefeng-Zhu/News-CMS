from flask import abort
from flask.ext.restful import Resource
from util.serialize import article_serialize
from newspaper import Article
import urlparse


class ArticleAPI(Resource):

    def get(self, link):
        if urlparse.urlparse(link).scheme not in ('http', 'https'):
            abort(400)

        article = Article(link, keep_article_html=True)
        article.download()
        article.parse()

        return article_serialize(article)
