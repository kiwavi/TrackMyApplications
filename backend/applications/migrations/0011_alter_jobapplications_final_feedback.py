# Generated by Django 4.1.4 on 2022-12-30 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0010_alter_jobapplications_final_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplications',
            name='final_feedback',
            field=models.CharField(choices=[('None', 'None'), ('Rejected', 'Rejected'), ('Offer', 'Offer')], default=('None', 'None'), max_length=50),
        ),
    ]
