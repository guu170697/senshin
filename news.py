#apikey=ad340eb6196049c4bfdf0db67da08609

from newsapi import NewsApiClient
# クライアントを初期化
newsapi = NewsApiClient(api_key='ad340eb6196049c4bfdf0db67da08609')

# sourcesで指定したニュースサイトからトップニュースを取得
headlines = newsapi.get_top_headlines(category='business', country='jp')

# 取得したトップニュースの１件を表示
print(headlines['articles'][0])