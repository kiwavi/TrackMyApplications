# Generated by Django 4.1.4 on 2023-01-02 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0013_alter_jobapplications_final_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplications',
            name='interviewed',
            field=models.BooleanField(default=False),
        ),
    ]
