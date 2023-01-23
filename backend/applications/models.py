from django.db import models
from datetime import date
from django.utils import timezone
from django.db.models.signals import pre_save, post_save
# Create your models here.

application_choices = [
    ('Linkedin','Linkedin'),
    ('Company Website','Company Website'),
    ('Referral','Referral'),
    ('Job Search Site','Job Search Site'),
    ('Recruiter Call','Recruiter Call'),
    ('Sent an email','Sent an email'),
]

feedbacks = [
    ('None','None'),
    ('Rejected','Rejected'),
    ('Offer','Offer'),
]

class JobApplications(models.Model):
    title = models.CharField(max_length=40)
    company = models.CharField(max_length=40)
    job_description = models.TextField(null=True,blank=True)
    application_portal = models.CharField(max_length=50,choices=application_choices)
    # application_date = models.DateField(default=date.today())
    application_date = models.DateTimeField(auto_now_add=True)
    interviewed = models.BooleanField(default=False)
    final_feedback = models.CharField(max_length=50,choices=feedbacks,default='None')
    spam = models.BooleanField(default=False,null=True,blank=True)
    user = models.CharField(max_length=50)
    notes = models.TextField(blank=True,null=True)
    url = models.URLField(blank=True,null=True,max_length=300)
    entries = models.IntegerField(default=0)
    
def final_feedback_update(sender,instance,**kwargs):
    # do not mark as rejected or offered if interviewed is not set to true. If the person had already marked as rejected or offer, there's no turning back!
    if instance.final_feedback == 'Offer':
        if instance.interviewed == False:
            instance.final_feedback = 'None'
    elif instance.final_feedback == 'Offer':
        instance.final_feedback = 'Offer'
    elif instance.final_feedback == 'Rejected':
        instance.final_feedback = 'Rejected'
    else:
        pass

pre_save.connect(final_feedback_update,sender=JobApplications)

def defined_as_spam(sender, instance, **kwargs):
    if instance.spam == True:
        instance.delete()

post_save.connect(defined_as_spam,sender=JobApplications)


def capitalize_title(sender,instance,**kwargs):
    instance.title = instance.title.capitalize()

pre_save.connect(capitalize_title,sender=JobApplications)


def capitalize_company(sender, instance, **kwargs):
    instance.company = instance.company.capitalize()

pre_save.connect(capitalize_company,sender=JobApplications)


class Entries(models.Model):
    user = models.CharField(max_length=30)
    number_entries = models.IntegerField()

# record each entry that a person does for the jobapplications model in order to track them for subscriptions
def add_entry(sender,instance,**kwargs):
    print(instance.user)
    # print(Entries.objects.filter(user=instance.user) == True)
    if Entries.objects.filter(user=instance.user):        
        current_entries = Entries.objects.get(user=instance.user)
        current_entries.number_entries = current_entries.number_entries + 1
        current_entries.save()
    else:
        Entries.objects.create(user=instance.user,number_entries=1)

post_save.connect(add_entry,sender=JobApplications)

# don't allow an excess of 9000 applications for every user.
def check_entries(sender,instance,**kwargs):
    if Entries.objects.filter(user=instance.user):
        if Entries.objects.get(user=instance.user).number_entries > 9000:
            print(Entries.objects.get(user=instance.user).number_entries)
            instance.delete()
        else:
            pass

post_save.connect(check_entries,sender=JobApplications)


class ImportantLinks(models.Model):
    url = models.URLField(max_length=200)
    description = models.CharField(max_length=200)


# So an application has a job title, company, fit description(bool), where I applied (multichoice), day applied (default today), rejected or accepted (bool), whether I got interviewed (through link), whether they are scamy (default No). User has option to set that option later.
