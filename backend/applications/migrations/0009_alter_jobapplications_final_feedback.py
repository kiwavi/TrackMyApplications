# Generated by Django 4.1.4 on 2022-12-30 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0008_alter_jobapplications_final_feedback_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplications',
            name='final_feedback',
            field=models.CharField(blank=True, choices=[('None', 'None'), ('Rejected', 'Rejected'), ('Offer', 'Offer')], default='None', max_length=50, null=True),
        ),
    ]
