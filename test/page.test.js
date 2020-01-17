/* eslint-disable no-undef */
jest.setTimeout(10000);

describe('Input methods', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  });

  it('Sample audio', async () => {
    await page.waitFor('div.bx--dropdown', { timeout: 0 });

    // Choose language model.
    await expect(page).toClick('div.bx--dropdown');
    await expect(page).toClick('div.bx--list-box__menu-item__option', {
      text: 'US English (8khz Narrowband)',
    });

    // Add custom keywords.
    await expect(page).toFill('textarea.bx--text-area', 'course, I');

    // Choose to detect speakers.
    await expect(page).toClick('span.bx--toggle__switch');

    // Play sample audio.
    await expect(page).toClick('button.submit-button', {
      text: 'Play audio sample',
    });

    // Wait for the audio to play for a bit.
    await page.waitFor(5000);

    // Assert that some transcript text has shown up.
    const transcriptBox = await page.$('div.transcript-box');
    const text = await transcriptBox.getProperty('textContent');
    expect(text).toBeTruthy();
  });

  it('File upload', async () => {
    await page.waitFor('div.bx--dropdown', {
      timeout: 0,
    });

    // Choose language model.
    await expect(page).toClick('div.bx--dropdown');
    await expect(page).toClick('div.bx--list-box__menu-item__option', {
      text: 'US English (16khz Broadband)',
    });

    // Upload file.
    await expect(page).toUploadFile(
      'input.bx--visually-hidden',
      'public/audio/en-US_Broadband-sample.wav',
    );

    // Wait for the audio to play for a bit.
    await page.waitFor(5000);

    // Assert that some transcript text has shown up.
    const transcriptBox = await page.$('div.transcript-box');
    const text = await transcriptBox.getProperty('textContent');
    expect(text).toBeTruthy();
  });
});
