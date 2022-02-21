from unicodedata import category
from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=30,primary_key=True)

class Article(models.Model):
    name = models.CharField(max_length=100)
    content_path = models.CharField(max_length=100)
    category = models.ManyToManyField(Category,related_name="articles")
