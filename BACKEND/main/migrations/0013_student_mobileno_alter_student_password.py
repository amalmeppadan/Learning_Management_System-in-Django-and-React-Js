# Generated by Django 5.1 on 2024-08-28 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_teacher_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='mobileno',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
