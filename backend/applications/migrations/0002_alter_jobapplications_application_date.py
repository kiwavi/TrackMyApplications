# Generated by Django 4.1.4 on 2022-12-21 16:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplications',
            name='application_date',
            field=models.DateField(default=datetime.date(2022, 12, 21)),
        ),
    ]
