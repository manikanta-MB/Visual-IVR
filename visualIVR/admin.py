from django.contrib import admin
from visualIVR.models import Article,Category

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]

class ArticleAdmin(admin.ModelAdmin):
    list_display = ["name","content_path"]

admin.site.register(Category,CategoryAdmin)
admin.site.register(Article,ArticleAdmin)
