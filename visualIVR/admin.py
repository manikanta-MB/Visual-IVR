from django.contrib import admin
from visualIVR.models import Article,Category

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name","read_count"]

class ArticleAdmin(admin.ModelAdmin):
    list_display = ["id","name","content_path","read_count"]

admin.site.register(Category,CategoryAdmin)
admin.site.register(Article,ArticleAdmin)
