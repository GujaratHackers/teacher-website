import boto3

def initiate_client():

    client = boto3.client(
        "sns",
        aws_access_key_id = 'ASIASWREH62U5QVZI6YZ',
        aws_secret_access_key = '6CtmiAYUG7jhzO/FuLUB0OF2HFDF8Y979lNwc9Vk',
        aws_session_token = 'FwoGZXIvYXdzEP3//////////wEaDECk56zaNUEo1JnZ1iK/ARqdoe2z/tE4pqogXB2bfJZGeJmF1BJ3dDBglc5fpThMKfprlYAx6gyv8wgJ+Y05Usbxozv4HsLN/J7pmFTtSQZ2oaw8XTnyTvuNU9JoipbNaeSOIQ4kdeOKhHg/80gxTZuWH/jKDlTTED7XWdUfXpGUPqzMeXvc/yLlUThhd/bjt2PEftfBZjnJPZvFAbEbjGPhUbqcwSrnFm5qaA2Juzb9xoEcQv5i+PRhGWqn40wxZP/N0/4toUTO/FrwdQ0uKOSy0foFMi2GMCfWDABPmpX3Bu6yIQMDmWEUbHrQbH4H2/KH9VJnqQJP32+eCAwLMcGMIcA=',
        region_name = "us-east-1"
    )

    return client
