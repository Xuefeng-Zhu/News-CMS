News-CMS
===========
News CMS is a simple news content management system built for mobile. 

+ [Admin Demo] (http://xuefeng-zhu.github.io/News-CMS/admin/)
+ [Server Side Code](https://github.com/Xuefeng-Zhu/flask-news-api)

## Features
+ Load and parse article through url
+ Preview news
+ Search, Edit and Delete news

## Usage
+ Create Account (Based on [Link](https://github.com/Xuefeng-Zhu/flask-user-api))

```
curl http://floating-retreat-4846.herokuapp.com/
/create_user -X POST -d "email=123@gmail.com" -d "password=123"
```

+ Login in [Admin] (http://xuefeng-zhu.github.io/News-CMS/admin/) with the account and create news.
+ Go to News List to view news, and click specific news to edit or delete
+ Get new list, which can be displayed on mobile device

```
Get News List
curl http://lit-everglades-2593.herokuapp.com/news_list/tagA+tagB/page#
```
or 

```
curl http://lit-everglades-2593.herokuapp.com/news_list/all/page#
```
or 

```
Search News List
curl http://lit-everglades-2593.herokuapp.com/search_news -X POST -d "search=test" -d "tags=[]" -d "page=0"
```
[API Manual](https://github.com/Xuefeng-Zhu/flask-news-api)

+ View article by going to news_url from news list

## Thanks
+ Angular
+ SweetAlert
+ angular-upload
+ ngTagEditor

## License
MIT
