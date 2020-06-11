# Run locally

This document shows how to run the `speech-to-text-code-pattern` application on your local machine.

## Steps

1. [Clone the repo](#clone-the-repo)
1. [Configure credentials](#configure-credentials)
1. [Start the server](#start-the-server)

### Clone the repo

Clone `speech-to-text-code-pattern` repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/speech-to-text-code-pattern
cd speech-to-text-code-pattern
```

### Configure credentials

Copy the `env.sample` file to `.env`.

```bash
cp env.sample .env
```

Edit the `.env` file to configure credentials before starting the Node.js server.
The credentials to configure will depend on whether you are provisioning services using IBM Cloud Pak for Data or on IBM Cloud.
 
Click to expand one:

<details><summary><b>IBM Cloud Pak for Data</b></summary>
<p>

For the **Speech to Text** service, the following settings are needed:

* Set <b>SPEECH_TO_TEXT_AUTH_TYPE</b> to <b>cp4d</b>
* Provide the <b>SPEECH_TO_TEXT_URL</b>, <b>SPEECH_TO_TEXT_USERNAME</b> and <b>SPEECH_TO_TEXT_PASSWORD</b> collected in the previous step.
* For the <b>SPEECH_TO_TEXT_AUTH_URL</b> use the base fragment of your URL including the host and port. <i>I.e. https://{cpd_cluster_host}{:port}</i>.
* If your CPD installation is using a self-signed certificate, you need to disable SSL verification with <b>SPEECH_TO_TEXT_AUTH_DISABLE_SSL</b> set to true. You might also need to use browser-specific steps to ignore certificate errors (try browsing to the AUTH_URL). Disable SSL only if absolutely necessary, and take steps to enable SSL as soon as possible.
* Make sure the examples for IBM Cloud and bearer token auth are commented out (or removed).

```bash
#----------------------------------------------------------
# IBM Cloud Pak for Data (username and password)
#
# If your services are running on IBM Cloud Pak for Data,
# uncomment and configure these.
# Remove or comment out the IBM Cloud section.
#----------------------------------------------------------

SPEECH_TO_TEXT_AUTH_TYPE=cp4d
SPEECH_TO_TEXT_URL=https://{cpd_cluster_host}{:port}/speech-to-text/{release}/instances/{instance_id}/api
SPEECH_TO_TEXT_AUTH_URL=https://{cpd_cluster_host}{:port}
SPEECH_TO_TEXT_USERNAME=<add_speech-to-text_username>
SPEECH_TO_TEXT_PASSWORD=<add_speech-to-text_password>
# If you use a self-signed certificate, you need to disable SSL verification.
# This is not secure and not recommended.
# SPEECH_TO_TEXT_AUTH_DISABLE_SSL=true
```

</p>
</details>

<details><summary><b>IBM Cloud</b></summary>
<p>

For the Speech to Text service, the following settings are needed:

* Set <b>SPEECH_TO_TEXT_AUTH_TYPE</b> to <b>iam</b>
* Provide the <b>SPEECH_TO_TEXT_URL</b> and <b>SPEECH_TO_TEXT_APIKEY</b> collected in the previous step.
* Make sure the examples for IBM Cloud Pak for Data and bearer token auth are commented out (or removed).
<p>

```bash
#----------------------------------------------------------
# IBM Cloud
#
# If your services are running on IBM Cloud,
# uncomment and configure these.
# Remove or comment out the IBM Cloud Pak for Data sections.
#----------------------------------------------------------

SPEECH_TO_TEXT_AUTH_TYPE=iam
SPEECH_TO_TEXT_APIKEY=<add_speech-to-text_apikey>
SPEECH_TO_TEXT_URL=<add_speech-to-text_url>
```

</p>
</details>

> Need more information? See the [authentication wiki](https://github.com/IBM/node-sdk-core/blob/master/AUTHENTICATION.md).

### Start the server

```bash
npm install
npm start
```

The application will be available in your browser at http://localhost:5000.  Return to the README.md for instructions on how to use the app.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](../../README.md#3-use-the-app)