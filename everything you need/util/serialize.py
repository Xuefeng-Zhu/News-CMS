def news_serialize(news):
    result = {}
    for key in news:
        if key == 'id':
            result[key] = str(news[key])
        elif key == 'date':
            result[key] = news[key].strftime("%B %d, %Y %I:%M%p")
        else:
            result[key] = news[key]
    return result


def news_list_serialize(news_list):
    result = []
    for news in news_list:
        temp = {}
        for key in news:
            if key == 'id' or key == 'content' or key == 'comments':
                pass
            elif key == 'date':
                temp[key] = news[key].strftime("%B %d, %Y %I:%M%p")
            elif news[key] is None:
                temp[key] = ''
            else:
                temp[key] = news[key]
        temp['news_url'] = "http://xuefeng-zhu.github.io/news-client\/user/#/view/%s" % news['title']
        result.append(temp)
    return result


def comments_serialize(comments):
    result = []
    for comment in comments:
        temp = {}
        for key in comment:
            if key == 'id':
                pass
            elif key == 'date':
                temp[key] = comment[key].strftime("%B %d, %Y %I:%M%p")
            else:
                temp[key] = comment[key]
        result.append(temp)
    return result


def article_serialize(article):
    result = {
        'title': article.title,
        'news_pic': article.top_image,
        'content': article.article_html
    }
    return result
