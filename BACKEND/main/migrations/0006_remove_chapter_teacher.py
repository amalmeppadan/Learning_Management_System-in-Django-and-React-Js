# Generated by Django 5.1 on 2024-08-22 06:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_student_options_chapter'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chapter',
            name='teacher',
        ),
    ]
