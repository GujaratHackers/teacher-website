import boto3
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

from .config import (
    auth_token,
    account_sid,
    aws_access_key_id,
    aws_secret_access_key,
    aws_session_token,
    region_name,
    twilio_number
)

twilio_client = Client(account_sid, auth_token)


def initiate_client():

    client = boto3.client(
        "sns",
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        aws_session_token=aws_session_token,
        region_name=region_name,
    )

    return client


def send_message(phone_number, message):
    """
    Send a message using twilio client
    """
    try:
        twilio_client.messages.create(
            to="+91" + phone_number, from_=twilio_number, body=message
        )
    except:
        pass