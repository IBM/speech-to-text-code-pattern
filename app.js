const { Cp4dTokenManager, IamTokenManager } = require('ibm-watson/auth');
const path = require('path');
const express = require('express');
const vcapServices = require('vcap_services');
const app = express();
require('./config/express')(app);

let url = process.env.SPEECH_TO_TEXT_URL;

// Supply the API key for IAM authentication.
let apikey = process.env.SPEECH_TO_TEXT_APIKEY;

// Supply the bearer token + URL for an instance on CPD (see the README for more details).
let bearerToken = process.env.SPEECH_TO_TEXT_BEARER_TOKEN;

// Supply the username + password + URL as an alternative for an instance on CPD.
let username = process.env.SPEECH_TO_TEXT_USERNAME;
let password = process.env.SPEECH_TO_TEXT_PASSWORD;

// On Cloud Foundry, we'll have a VCAP_SERVICES environment variable with credentials.
let vcapCredentials = vcapServices.getCredentials('speech_to_text');

// Create appropriate token manager.
let tokenManager;
if (vcapCredentials || apikey) {
  // Choose credentials from VCAP if they exist.
  apikey = (vcapCredentials && vcapCredentials.apikey) || apikey;
  url = (vcapCredentials && vcapCredentials.url) || url;

  try {
    tokenManager = new IamTokenManager({ apikey });
  } catch (err) {
    console.error('Error creating IAM token manager: ', err);
  }
} else if (username && password && url) {
  try {
    tokenManager = new Cp4dTokenManager({ username, password, url });
  } catch (err) {
    console.error('Error creating CP4D token manager: ', err);
  }
}

const getToken = async () => {
  let tokenResponse = {};

  try {
    if (tokenManager) {
      const token = await tokenManager.getToken();
      tokenResponse = {
        ...tokenResponse,
        accessToken: token,
        url,
      };
    } else if (bearerToken && url) {
      tokenResponse = {
        ...tokenResponse,
        accessToken: bearerToken,
        url,
      };
    } else {
      tokenResponse = {
        ...tokenResponse,
        error: {
          title: 'No valid credentials found',
          description:
            'Could not find valid credentials for the Speech to Text service.',
          statusCode: 401,
        },
      };
    }
  } catch (err) {
    tokenResponse = {
      ...tokenResponse,
      error: {
        title: 'Authentication error',
        description:
          'There was a problem authenticating with the Speech to Text service.',
        statusCode: 400,
      },
    };
  }

  return tokenResponse;
};

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/health', (_, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/auth', async (_, res, next) => {
  const token = await getToken();

  if (token.error) {
    console.error(token.error);
    next(token.error);
  } else {
    return res.json(token);
  }
});

// error-handler settings for all other routes
require('./config/error-handler')(app);

module.exports = app;
