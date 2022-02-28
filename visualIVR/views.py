import json
import os
from unicodedata import category
from django.http import JsonResponse
from django.shortcuts import render
from visualIVR.models import Article, Category
from gtts import gTTS
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def home_page(request):
    default_article_path = "3,700 girls undergoing self-defence training.txt"
    return render(request,'index.html',{"default_article_path":default_article_path})

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

@csrf_exempt
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

@csrf_exempt
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

@csrf_exempt
def generate_tts(request):
    body = json.loads(request.body)
    filename_woe = os.path.splitext(body["filename"])[0]
    dir_name = os.path.dirname(os.path.abspath(__file__))
    output_path = dir_name+"/static/Audio News/"+filename_woe+".mp3"
    if(os.path.exists(output_path)):
        print("entered")
        return JsonResponse({"success":True})
    else:
        file = open(dir_name+"/static/Articles/"+body["filename"])
        text_data = ""
        for line in file:
            stripped_line = line.rstrip()
            text_data += stripped_line + " "
        speech_data = gTTS(text_data, lang='en', tld='co.in')
        speech_data.save(output_path)
        return JsonResponse({"success":True})
