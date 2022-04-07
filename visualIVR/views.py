import json
import os
from unicodedata import category
# from django.http import JsonResponse
from django.shortcuts import render
from visualIVR.models import Article, Category
# from django.views.decorators.csrf import csrf_exempt

#Global Variables
no_of_articles_to_show = 4
no_of_categories_to_show = 4

# Create your views here.

def home_page(request):
    default_article_path = "3,700 girls undergoing self-defence training.txt"
    return render(request,'index.html',{"default_article_path":default_article_path})

def list_articles(request,category_name,starting_index):
    starting_index = int(starting_index)
    next_index = starting_index + no_of_articles_to_show
    if(category_name == "all"):
        articles = Article.objects.all()[starting_index : starting_index + 5]
    else:
        category = Category.objects.get(name=category_name)
        articles = category.articles.all()[starting_index : starting_index + 5]
    if(articles.count() == 5):
        next_article_exist=True
    else:
        next_article_exist=False
    return render(request,'articles_list.html',{
        "articles":articles[:4],
        "next_article_exist":next_article_exist,
        "category_name":category_name,
        "next_index":next_index
        })

def list_categories(request,starting_index):
    starting_index = int(starting_index)
    next_index = starting_index + no_of_categories_to_show
    categories = Category.objects.all()[starting_index : starting_index + 5]
    if(categories.count() == 5):
        next_category_exist = True
    else:
        next_category_exist = False
    return render(request,'categories_list.html',{
        "categories":categories[:4],
        "next_category_exist":next_category_exist,
        "next_index":next_index
    })
