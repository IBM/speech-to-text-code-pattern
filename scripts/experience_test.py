import os, time, sys, datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

date = datetime.datetime.now().strftime("%Y-%m-%d-%H%M:%S:%f")

# Do an action on the app's landing page
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)
success = False
try:
    app_url = os.environ.get("APP_URL", "http://localhost:5000/")
    print("APP_URL: ", app_url)
    driver.get(app_url)  # Open a browser to the app's landing page
    print("Title: ", driver.title)
    expected_title = "Speech to Text"
    if driver.title != expected_title:
        raise Exception("Title should be " + expected_title)

    # Find button and click it
    sample_button = driver.find_element_by_xpath("//button[contains(text(),'Play audio sample')]")  # Locate the button
    sample_button.click()

    # Verify the action on the app's landing page
    time.sleep(30)
    transcript = driver.find_element_by_class_name('transcript-box').text.splitlines()
    print("Transcript: ", transcript)
    expected = "So thank you very much for coming"  # The beginning of the text...

    if expected not in transcript[0]:
        raise Exception("Did not get the expected transcript")

    success = True

except Exception as e:
    print("Exception: ", e)
    raise

finally:
    driver.quit()
    if success:
        print("Experience Test Successful")
    else:
        sys.exit("Experience Test Failed")
