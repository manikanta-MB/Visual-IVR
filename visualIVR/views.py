import json
from unicodedata import category
from django.http import JsonResponse
from django.shortcuts import render
from visualIVR.models import Article, Category

# Create your views here.

def home_page(request):
    return render(request,'index.html')

def list_articles(request,category_name):
    if(category_name == "all"):
        articles = Article.objects.all()[:5]
    else:
        category = Category.objects.get(name=category_name)
        articles = category.articles.all()[:5]
    if(articles.count() == 5):
        next_article_exist=True
    else:
        next_article_exist=False
    return render(request,'articles_list.html',{
        "articles":articles[:4],
        "next_article_exist":next_article_exist,
        "category_name":category_name
        })

def list_categories(request):
    categories = Category.objects.all()[:5]
    if(categories.count() == 5):
        next_category_exist = True
    else:
        next_category_exist = False
    return render(request,'categories_list.html',{
        "categories":categories[:4],
        "next_category_exist":next_category_exist
    })

def next_top_articles(request):
    body = json.loads(request.body)
    next_index = int(body["nextIndex"])
    category_name = body["categoryName"]
    if(category_name == "all"):
        articles = Article.objects.all()[next_index:next_index+5]
    else:
        category = Category.objects.get(name=category_name)
        articles = category.articles.all()[next_index:next_index+5]
    result = []
    for article in articles[:4]:
        result.append({
            "name":article.name,
            "contentPath":article.content_path
        })
    if(articles.count() == 5):
        next_index += 4
    else:
        next_index = False
    return JsonResponse({"nextIndex":next_index,"data":result})

def next_top_categories(request):
    body = json.loads(request.body)
    next_index = int(body["nextIndex"])
    categories = Category.objects.all()[next_index:next_index+5]
    result = []
    for category in categories[:4]:
        result.append({"name":category.name})
    if(categories.count() == 5):
        next_index += 4
    else:
        next_index = False
    return JsonResponse({"nextIndex":next_index,"data":result})
