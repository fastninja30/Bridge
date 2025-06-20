import resend
import json
from pathlib import Path

resendCfg = Path("../../ResendAPIKey.json")
config = json.loads(resendCfg.read_text())
resend.api_key = config["API_KEY"]

def sendVerificationEmail(email, code):
    r = resend.Emails.send({
    "from": "onboarding@resend.dev",
    "to": email,
    "subject": "Verify Your Email",
    "html": "<p>Please enter the following code in the app: <u>"+code+"</u></p>"
    })

def sendPasswordResetEmail(email, link): 
    r = resend.Emails.send({
    "from": "onboarding@resend.dev",
    "to": email,
    "subject": "Password reset",
    "html": "<p>This is your password reset link: <a href="+link+">Password Reset Link</a></p>"
    })