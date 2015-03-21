from flask import request, abort
from flask.ext.restful import Resource, reqparse
from model.news import News
from util.serialize import news_serialize, news_list_serialize
from util import cache
from util.adminAuth import auth_required
import boto
from PIL import Image
from StringIO import StringIO
import os


newsParser = reqparse.RequestParser()
newsParser.add_argument('id', type=str)
newsParser.add_argument('title', type=str)
newsParser.add_argument('abstract', type=str)
newsParser.add_argument('news_pic', type=str)
newsParser.add_argument('content')


class NewsAPI(Resource):

    def options(self):
        pass

    def get(self):
        args = newsParser.parse_args()
        title = args['title']

        if title is None:
            abort(400)

        news = cache.get(title)
        if news is not None:
            return news_serialize(news)

        news = News.objects(title=title).exclude('comments').first()
        if news is None:
            abort(400)
        news.update(inc__news_views=1)
        cache.set(title, news, timeout=60)

        return news_serialize(news)

    @auth_required
    def put(self):
        args = newsParser.parse_args()
        title = args['title']
        abstract = args['abstract']
        news_pic = args['news_pic']
        content = args['content']
        tags = request.json['tags']

        if title is None:
            abort(400)

        try:
            news = News(title=title, abstract=abstract,
                        news_pic=news_pic, content=content, tags=tags)
            news.save()
        except:
            print title
            abort(400)

        return news_serialize(news)

    @auth_required
    def post(self):
        args = newsParser.parse_args()
        id = args['id']
        title = args['title']
        abstract = args['abstract']
        news_pic = args['news_pic']
        content = args['content']
        tags = request.json['tags']

        if id is None or title is None:
            abort(400)

        news = News.objects(id=id).exclude('comments').first()
        if news is None:
            abort(400)

        news.title = title
        news.abstract = abstract
        news.news_pic = news_pic
        news.content = content
        news.tags = tags
        news.save()
        cache.delete(title)

        return news_serialize(news)

    @auth_required
    def delete(self):
        args = newsParser.parse_args()
        id = args['id']

        if id is None:
            abort(400)

        news = News.objects(id=id).first()
        if news is None:
            abort(400)

        news.delete()
        return {'status': 'success'}


class NewsImageAPI(Resource):

    def options(self):
        pass

    @auth_required
    def post(self):
        uploaded_file = request.files['file']

        conn = boto.connect_s3(os.environ['S3_KEY'], os.environ['S3_SECRET'])
        bucket = conn.get_bucket('news-pic')
        key = bucket.new_key(uploaded_file.filename)
        key.set_contents_from_file(uploaded_file)

        return {'url': 'https://s3.amazonaws.com/news-pic/%s'
                % uploaded_file.filename}


class NewsThumbnailAPI(Resource):

    def options(self):
        pass

    @auth_required
    def post(self):
        uploaded_file = request.files['file']
        width = 230
        height = 154
        img = Image.open(uploaded_file)
        resized_img = img.resize((width, height))
        fp = StringIO()
        resized_img.save(fp, 'PNG')
        fp.seek(0)
        filename = '_'.join([str(width), str(height), uploaded_file.filename])

        conn = boto.connect_s3(os.environ['S3_KEY'], os.environ['S3_SECRET'])
        bucket = conn.get_bucket('news-pic')
        key = bucket.new_key(filename)
        key.set_contents_from_file(fp)

        return {'url': 'https://s3.amazonaws.com/news-pic/%s' % filename}


class NewsListAPI(Resource):

    @cache.cached(timeout=600)
    def get(self, tags, page):
        if tags != 'all':
            tags = tags.split('+')
            news_list = News.objects(tags__all=tags).exclude(
                'content', 'comments').order_by(
                '-date')[10 * page: 10 * (page + 1)]
        else:
            news_list = News.objects().exclude('content', 'comments').order_by(
                '-date')[10 * page: 10 * (page + 1)]
        return news_list_serialize(news_list)


searchParser = reqparse.RequestParser()
searchParser.add_argument('search', type=str)
searchParser.add_argument('page', type=int)


class SearchNewsAPI(Resource):

    def options(self):
        pass

    def post(self):
        args = searchParser.parse_args()
        search = args['search']
        tags = request.json['tags']
        page = args['page']

        if tags is None or len(tags) == 0:
            news_list = News.objects().exclude(
                'content', 'comments').order_by('-date')
        else:
            news_list = News.objects(tags__all=tags).exclude(
                'content', 'comments').order_by('-date')
        if search is not None and search is not '':
            news_list = news_list.filter(title__icontains=search)

        return news_list_serialize(news_list[10 * page: 10 * (page + 1)])
