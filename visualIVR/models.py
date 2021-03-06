from unicodedata import category
from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=30,primary_key=True)
    read_count = models.IntegerField(default=0)

class Article(models.Model):
    name = models.CharField(max_length=100,unique=True)
    content_path = models.CharField(max_length=200)
    categories = models.ManyToManyField(Category,related_name="articles")
    read_count = models.IntegerField(default=0)
