import json
import os
from unicodedata import category
import django
# from django.http import JsonResponse
from django.db import transaction
from django.views.decorators.cache import cache_control
from django.shortcuts import render
from visualIVR.models import Article, Category
# from django.views.decorators.csrf import csrf_exempt

#Global Variables
no_of_articles_to_show = 4
no_of_categories_to_show = 4

# Create your views here.

def home_page(request):
    top_article_id = Article.objects.order_by('-read_count')[0].id
    return render(request,'index.html',{"top_article_id":top_article_id})

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def list_articles(request,category_name,starting_index):
    starting_index = int(starting_index)
    next_index = starting_index + no_of_articles_to_show
    if(category_name == "all"):
        articles = Article.objects.order_by('-read_count')[starting_index : starting_index + 5]
    else:
        category = Category.objects.get(name=category_name)
        articles = category.articles.order_by('-read_count')[starting_index : starting_index + 5]
    if(articles.count() == 5):
        next_article_exist=True
    else:
        next_article_exist=False
    articles = articles[:4]
    if(next_article_exist):
        next_top_article_tabIndex = articles.count() + 1
        mainMenu_tabIndex = next_top_article_tabIndex + 1
    else:
        next_top_article_tabIndex = None
        mainMenu_tabIndex = articles.count() + 1
    return render(request,'articles_list.html',{
        "articles":articles,
        "next_article_exist":next_article_exist,
        "category_name":category_name,
        "next_index":next_index,
        "next_top_article_tabIndex":next_top_article_tabIndex,
        "mainMenu_tabIndex":mainMenu_tabIndex
        })

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def list_categories(request,starting_index):
    starting_index = int(starting_index)
    next_index = starting_index + no_of_categories_to_show
    categories = Category.objects.order_by('-read_count')[starting_index : starting_index + 5]
    if(categories.count() == 5):
        next_category_exist = True
    else:
        next_category_exist = False
    categories = categories[:4]
    if(next_category_exist):
        next_top_category_tabIndex = categories.count() + 1
        mainMenu_tabIndex = next_top_category_tabIndex + 1
    else:
        next_top_category_tabIndex = None
        mainMenu_tabIndex = categories.count() + 1
    return render(request,'categories_list.html',{
        "categories":categories,
        "next_category_exist":next_category_exist,
        "next_index":next_index,
        "next_top_category_tabIndex":next_top_category_tabIndex,
        "mainMenu_tabIndex":mainMenu_tabIndex
    })

def read_article(request,article_id):
    article = Article.objects.get(id=article_id)
    with transaction.atomic():
        article.read_count += 1
        article.save()
        for category in article.categories.all():
            category.read_count += 1
            category.save()
    article_path = os.path.join(os.getcwd(),'visualIVR','static','News',article.content_path)
    file_obj = open(article_path,"r")
    article_content = file_obj.read()
    return render(request,'article.html',{"article_content":article_content,"article_name":article.name})

def manifest_view(request):
    return render(request,'manifest.webapp',content_type='application/x-web-app-manifest+json')
