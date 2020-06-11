# Run on Red Hat OpenShift

This document shows how to deploy the server using Red Hat OpenShift.

## Prerequisites

You will need a running OpenShift cluster, or OKD cluster. You can provision [OpenShift on the IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/openshiftcluster).

## Steps

1. [Create an OpenShift project](#create-an-openshift-project)
1. [Create the config map](#create-the-config-map)
1. [Get a secure endpoint](#get-a-secure-endpoint)
1. [Run the web app](#run-the-web-app)

## Create an OpenShift project

* Using the OpenShift web console, select the `Application Console` view.

  ![console-options](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-app-console-option.png)

* Use the `+Create Project` button to create a new project, then click on your project to open it.

* In the `Overview` tab, click on `Browse Catalog`.

  ![Browse Catalog](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-browse-catalog.png)

* Choose the `Node.js` app container and click `Next`.

  ![Choose Node.js](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-choose-nodejs.png)

* Give your application a name and add `https://github.com/IBM/speech-to-text-code-pattern` for the `Git Repository`, then click `Create`.

  ![Add github repo](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-add-github-repo.png)

## Create the config map

Create a config map to configure credentials for the Node.js server.

* Click on the `Resources` tab and choose `Config Maps` and then click the `Create Config Map` button.
* Provide a `Name` for the config map.
* Add items with keys and values. The necessary keys to configure will depend on whether you are provisioning services using IBM Cloud Pak for Data or on IBM Cloud.

Click to expand one:

<details><summary><b>IBM Cloud Pak for Data</b></summary>
<p>

For the Speech to Text service, the following settings are needed:

* Set <b>SPEECH_TO_TEXT_AUTH_TYPE</b> to <b>cp4d</b>
* Provide the <b>SPEECH_TO_TEXT_URL</b>, <b>SPEECH_TO_TEXT_USERNAME</b> and <b>SPEECH_TO_TEXT_PASSWORD</b> for the user added to this service instance.
* For the <b>SPEECH_TO_TEXT_AUTH_URL</b> use the base fragment of your URL including the host and port. <i>I.e. https://{cpd_cluster_host}{:port}</i>.
* If your CPD installation is using a self-signed certificate, you need to disable SSL verification with <b>SPEECH_TO_TEXT_AUTH_DISABLE_SSL</b> set to true. You might also need to use browser-specific steps to ignore certificate errors (try browsing to the AUTH_URL). Disable SSL only if absolutely necessary, and take steps to enable SSL as soon as possible.

  | Key | Value |
  | --- | --- |
  | SPEECH_TO_TEXT_AUTH_TYPE | cp4d |
  | SPEECH_TO_TEXT_URL | https://{cpd_cluster_host}{:port}/speech-to-text/{release}/instances/{instance_id}/api |
  | SPEECH_TO_TEXT_AUTH_URL | https://{cpd_cluster_host}{:port} |
  | SPEECH_TO_TEXT_USERNAME | <add_speech-to-text_username> |
  | SPEECH_TO_TEXT_PASSWORD | <add_speech-to-text_password> |
  | SPEECH_TO_TEXT_AUTH_DISABLE_SSL | true or false |
  | PORT | 8080 |

</p>
</details>

<details><summary><b>IBM Cloud</b></summary>
<p>

For the Speech to Text service, the following settings are needed:

* Set <b>SPEECH_TO_TEXT_AUTH_TYPE</b> to <b>iam</b>
* Provide the <b>SPEECH_TO_TEXT_URL</b> and <b>SPEECH_TO_TEXT_APIKEY</b> collected when you created the services.

  | Key | Value |
  | --- | --- |
  | SPEECH_TO_TEXT_AUTH_TYPE | iam |
  | SPEECH_TO_TEXT_APIKEY | <add_speech-to-text_apikey> |
  | SPEECH_TO_TEXT_URL | <add_speech-to-text_url> |
  | PORT | 8080 |

</p>
</details>

Create the config map and add it to your application.

* Hit the `Create` button.
* Click on your new Config Map's name.
* Click the `Add to Application` button.
* Select your application from the pulldown.
* Click `Save`.
* Go to the `Applications` tab, choose `Deployments` to view the status of your application.

## Get a secure endpoint

* From the OpenShift or OKD UI, under `Applications` ▷ `Routes` you will see your app.
  * Click on the application `Name`.
  * Under `TLS Settings`, click on `Edit`.
  * Under `Security`, check the box for `Secure route`.
  * Hit `Save`.

## Run the web app

* Go back to `Applications` ▷ `Routes`. You will see your app.
* Click your app's `Hostname`. This will open the Speech to Text web app in your browser.
* Go back to the README.md for instructions on how to use the app.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](../../README.md#3-use-the-app)