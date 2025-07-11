from twilio.rest import Client
import json
from pathlib import Path

# --- Configuration Loading ---
try:
    twilio_config_path = Path("../../TwilioAPIKey.json")
    config = json.loads(twilio_config_path.read_text())
    ACCOUNT_SID = config["ACC_SID"]
    AUTH_TOKEN = config["API_KEY"]

    # TODO: store your Twilio phone number in the config.
    TWILIO_PHONE_NUMBER = config["TWILIO_PHONE_NUMBER"] 
except FileNotFoundError:
    print("Error: Twilio configuration file not found.")
    exit()
except KeyError as e:
    print(f"Error: Missing key {e} in configuration file.")
    exit()

client = Client(ACCOUNT_SID, AUTH_TOKEN)

# --- Messaging Features ---

def send_verification_sms(recipient, verification_code):
    """Sends a simple SMS with a verification code."""
    if not TWILIO_PHONE_NUMBER:
        print("Error: TWILIO_PHONE_NUMBER not set in config.")
        return
    try:
        message = client.messages.create(
            from_=TWILIO_PHONE_NUMBER,
            body=f'Your verification code is: {verification_code}.',
            to=recipient
        )
        print(f"SMS sent successfully! SID: {message.sid}")
        return message.sid
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return None

def send_mms(recipient, image_url, body_text=""):
    """Sends an MMS with an image from a publicly accessible URL."""
    if not TWILIO_PHONE_NUMBER:
        print("Error: TWILIO_PHONE_NUMBER not set in config.")
        return
    try:
        message = client.messages.create(
            from_=TWILIO_PHONE_NUMBER,
            body=body_text,
            media_url=[image_url],
            to=recipient
        )
        print(f"MMS sent successfully! SID: {message.sid}")
        return message.sid
    except Exception as e:
        print(f"Error sending MMS: {e}")
        return None

# --- Voice Call Features ---

def make_voice_call(recipient, message_to_say):
    """Makes an automated voice call and speaks a message."""
    if not TWILIO_PHONE_NUMBER:
        print("Error: TWILIO_PHONE_NUMBER not set in config.")
        return
    try:
        call = client.calls.create(
            twiml=f'<Response><Say>{message_to_say}</Say></Response>',
            to=recipient,
            from_=TWILIO_PHONE_NUMBER
        )
        print(f"Call initiated successfully! SID: {call.sid}")
        return call.sid
    except Exception as e:
        print(f"Error making call: {e}")
        return None

# --- History & Lookup Features ---

def get_message_history(limit=20):
    """Retrieves a list of the most recent messages."""
    try:
        messages = client.messages.list(limit=limit)
        for record in messages:
            print(f"SID: {record.sid}, From: {record.from_}, To: {record.to}, Status: {record.status}")
        return messages
    except Exception as e:
        print(f"Error retrieving message history: {e}")
        return None

def lookup_phone_number(phone_number):
    """Looks up information about a phone number."""
    try:
        phone_number_info = client.lookups.v2.phone_numbers(phone_number).fetch()
        print(f"Phone Number: {phone_number_info.phone_number}")
        print(f"Country Code: {phone_number_info.country_code}")
        print(f"Valid: {phone_number_info.valid}")
        return phone_number_info
    except Exception as e:
        print(f"Error looking up phone number: {e}")
        return None

# --- Main Execution Block (Example Usage) ---
if __name__ == "__main__":
    test_recipient = "+15558675309"  # TODO: Replace with a real phone number for testing, store in secure locatoin

    print("--- Testing SMS ---")
    send_verification_sms(test_recipient, "987654")

    print("\n--- Testing MMS ---")
    # This must be a publicly accessible URL.
    image_url = "https://www.twilio.com/docs/images/library/wordmark-red.png" 
    send_mms(test_recipient, image_url, "Here is the Twilio logo!")

    print("\n--- Testing Voice Call ---")
    make_voice_call(test_recipient, "Hello from Twilio. This is a test call.")

    print("\n--- Testing Message History ---")
    get_message_history(limit=5)

    print("\n--- Testing Phone Number Lookup ---")
    lookup_phone_number(test_recipient)