/* eslint-disable no-undef */
jest.setTimeout(10000);

const TIMEOUT = { timeout: 3000 };
describe('Input methods', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  });

  it('Sample audio', async () => {

    await page.content();

    // Select English
    await (await page.waitForXPath('//*[@id="language-model-dropdown"]', TIMEOUT)).click();
    await (await page.waitForXPath('//*[text()="US English (8khz Narrowband)"]', TIMEOUT)).click();

    // Add custom keywords.
    const TEST_KEYWORDS = ', course, I';
    const keywords = await page.waitForXPath('//*[@class="cds--text-area cds--text-area--light"]', TIMEOUT);
    await keywords.type(TEST_KEYWORDS);
    const keywordsContent = await page.evaluate(el => el.textContent, keywords);
    expect(keywordsContent).toContain(TEST_KEYWORDS)

    // Choose to detect speakers.
    await (await page.waitForXPath('//*[@class="cds--toggle__switch"]', TIMEOUT)).click();

    // Play sample audio.
    await (await page.waitForXPath('//*[text()="Play audio sample"]', TIMEOUT)).click();

    // Wait for the audio to play for a bit.
    await page.waitForTimeout(5000);

    // Check transcript (CI checks box exists. Missing creds to check content.)
    expect(await page.waitForXPath('//*[@class="transcript-box"]', TIMEOUT)).toBeTruthy();

    /* With proper creds, this logs content and tests first words...
    const transcriptElement = await page.waitForXPath('//*[@class="transcript-box"]/div/span', TIMEOUT);
    const transcript = await page.evaluate(el => el.textContent, transcriptElement);
    console.log("TRANSCRIPT: ", transcript);
    expect(transcript).toContain("Thank you");
     */
  });

  it('File upload', async () => {

    await page.content();

    // Select English
    await (await page.waitForXPath('//*[@id="language-model-dropdown"]', TIMEOUT)).click();
    await (await page.waitForXPath('//*[text()="US English (16khz Broadband)"]', TIMEOUT)).click();

    // Upload file.
    await (await page.waitForXPath('//*[@id="id1"]', TIMEOUT)).uploadFile('public/audio/en-US_Broadband-sample.wav');

    // Wait for the audio to play for a bit.
    await page.waitForTimeout(5000);

    // Check transcript (CI checks box exists. Missing creds to check content.)
    expect(await page.waitForXPath('//*[@class="transcript-box"]', TIMEOUT)).toBeTruthy();

    /* With proper creds, this logs content and tests first words...
    const transcript = await page.evaluate(el => el.textContent, await page.waitForXPath('//*[@class="transcript-box"]/div/span', TIMEOUT));
    console.log("TRANSCRIPT: ", transcript);
    expect(transcript).toContain("So thank you very much for coming");
     */
  });
});
