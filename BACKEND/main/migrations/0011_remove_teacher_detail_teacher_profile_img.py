# Generated by Django 5.0.6 on 2024-08-27 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_courserating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='detail',
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_profile/'),
        ),
    ]
