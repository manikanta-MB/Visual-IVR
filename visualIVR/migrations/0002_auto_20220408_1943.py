# Generated by Django 2.2.8 on 2022-04-08 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualIVR', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='read_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='category',
            name='read_count',
            field=models.IntegerField(default=0),
        ),
    ]
