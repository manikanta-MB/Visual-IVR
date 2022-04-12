import os
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from visualIVR.models import Category,Article

class Command(BaseCommand):
    help = 'Fetching News from HTML files'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Indicates the path to the html file from which you want to extract the data.')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        with open(file_path,"r",encoding="utf8") as page:
            soup = BeautifulSoup(page.read(), "html.parser")
            newspaper_heading = soup.find("h1").text.strip()
            newspaper_name = newspaper_heading.split(" | ")[0]
            newspaper_date = newspaper_heading.split(" | ")[1]
            print(newspaper_name)
            print(newspaper_date)
            news_categories = soup.find("nav",{'id':'TOC'}).findChildren("ul",recursive=False)[0].findChildren("li",recursive=False)
            article_contents = soup.find_all('h2')
            index = 0
            for category in news_categories:
                category_name = category.findChildren('a',recursive=False)[0].text.partition(' ')[2].lower()
                base_dir = os.path.join(newspaper_name,newspaper_date,category_name)
                dir_path = os.path.join(os.getcwd(),"visualIVR","static","News",base_dir)
                os.makedirs(dir_path)
                category_obj = Category.objects.create(name=category_name)
                articles = category.findChildren('ul',recursive=False)[0].findChildren('li',recursive=False)
                for article in articles:
                    article_name = article.findChildren('a',recursive=False)[0].text.partition(' ')[2]
                    article_content = article_contents[index]
                    p = article_content.nextSibling.nextSibling
                    content = ''
                    while(p.find('a')==None):
                        content += p.text
                        p = p.nextSibling.nextSibling
                    if(not Article.objects.filter(name=article_name).exists()):
                        article_obj = Article.objects.create(name=article_name)
                    else:
                        article_obj = Article.objects.get(name=article_name)
                    write_path = os.path.join(dir_path,str(index)+".txt")
                    with open(write_path,"w") as write_file:
                        write_file.write(content)
                    article_obj.content_path = os.path.join(base_dir,str(index)+".txt")
                    article_obj.save()
                    category_obj.articles.add(article_obj)
                    index += 1
        self.stdout.write("News Successfully fetched.")
