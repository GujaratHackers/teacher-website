import boto3

def initiate_client():

    client = boto3.client(
        "sns",
        aws_access_key_id = 'ASIASWREH62U5467WSMR',
        aws_secret_access_key = 'eTdCtZ2i5CFG+bvuHb5XaGIbNJ2x4E6mEBYNpamE',
        aws_session_token = 'FwoGZXIvYXdzEAAaDMWwv9nW57mOJYBnHSK/AW7KVNuJytdgcCHswfJ+PfujDRAiOTaFjvtOQvVkH9zLsZ9Z8ktWDLvWI6WQiLc3U7gEwzVXtpYdW7zf/3XepJ9na+00iqaO56BqLu0o31sAzvqXjSyZbcKXMg0ccV0DVlSlq4fa9aLmwKke81XOx9YxuGlSqxfQ7bUB53nsvuRLsb2U6fgXaxgvOTzPRH8aJhogd45mqu6tHPt+9Uib1dvg8fLTxUvcyTkVD4761IJAfm5qJ43SEJSltUHaJlD/KLmI0voFMi2XlL1jjVoLH4gm03o7oGQy+TM4Xe0G5qYmpscHyp/x5vTr6ysTQFXKgVyrvmk=',
        region_name = "us-east-1"
    )

    return client
