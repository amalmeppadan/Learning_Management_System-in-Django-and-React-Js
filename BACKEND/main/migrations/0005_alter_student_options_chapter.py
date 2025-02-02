# Generated by Django 5.1 on 2024-08-22 05:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_course_featured_img'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='student',
            options={'verbose_name_plural': '5.Student'},
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True, null=True)),
                ('videos', models.FileField(null=True, upload_to='chapter_videos/')),
                ('remarks', models.TextField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.teacher')),
            ],
            options={
                'verbose_name_plural': '4.Chapters',
            },
        ),
    ]
