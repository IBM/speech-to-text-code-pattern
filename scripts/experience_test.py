import os, time, sys, datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

date = datetime.datetime.now().strftime("%Y-%m-%d-%H%M:%S:%f")

# Do an action on the app's landing page
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)
driver.get(os.environ.get("APP_URL", "http://localhost:5000/")); # Open a browser to the app's landing page
sample_button = driver.find_element_by_xpath("//button[contains(text(),'Play audio sample')]") # Locate the button
sample_button.click()

# Verify the action on the app's landing page
time.sleep(10)
transcript = driver.find_element_by_class_name('transcript-box').text.splitlines()
print("Transcript: ", transcript)
expected = "So thank you very much for coming"  # The beginning of the text...
if expected in transcript[0]:
    print("Experience Test Successful")
else:
    sys.exit("Experience Test Failed")
