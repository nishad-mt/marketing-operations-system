from rest_framework import serializers


class GoogleLoginSerializer(serializers.Serializer):

    ROLE_CHOICES = [

        ("social_media", "Social Media"),

        ("performance_marketer", "Performance Marketer"),

        ("content_head", "Content Head"),

        ("script_writer", "Script Writer"),

        ("copy_writer", "Copy Writer"),

        ("creator", "Creator"),

        ("editor", "Editor"),
    ]

    token = serializers.CharField()

    role = serializers.ChoiceField(
        choices=ROLE_CHOICES,
        required=False
    )

    mobile_number = serializers.CharField(
        max_length=15,
        required=False
    )

    def validate_mobile_number(self, value):

        if value and not value.isdigit():

            raise serializers.ValidationError(
                "Mobile number must contain only digits"
            )

        return value