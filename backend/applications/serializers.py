from rest_framework import serializers
from .models import JobApplications, Entries, ImportantLinks, ContactEmails

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplications
        fields = (
            'id',
            'title',
            'company',
            'application_portal',
            'application_date',
            'job_description',
            'notes',
            'interviewed',
            'final_feedback',
            'spam',
            'url',
            'user',
        )

        extra_kwargs = {
            'user': {
                'write_only': True,
            }
        }


class EntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entries
        fields = (
            'user',
            'number_entries'
        )

        extra_kwargs = {
            'user': {
                'write_only': True,
            }
        }


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantLinks
        fields = (
            'id',
            'url',
            'description',
        )

class ContactEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEmails
        fields = (
            'id',
            'email',
            'message',
        )
