"""visual_ivr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path,re_path,include
from visualIVR import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/',views.home_page),
    re_path('^articles/(?P<category_name>[a-zA-Z0-9_\- ]+)/(?P<starting_index>\d+)/$',views.list_articles),
    re_path('^categories/(?P<starting_index>\d+)/$',views.list_categories),
    path('',include('pwa.urls')),
]

# path('next_top_articles/',views.next_top_articles),
# path('next_top_categories/',views.next_top_categories),
# path('generate_tts/',views.generate_tts),
