import '@ciscospark/plugin-logger';
import '@ciscospark/internal-plugin-mercury';
import '@ciscospark/internal-plugin-conversation';
import '@ciscospark/internal-plugin-metrics';
import '@ciscospark/internal-plugin-flag';
import '@ciscospark/internal-plugin-feature';
import '@ciscospark/internal-plugin-presence';
import '@ciscospark/internal-plugin-search';
import '@ciscospark/internal-plugin-team';
import '@ciscospark/internal-plugin-user';
import '@ciscospark/plugin-authorization-browser';
import '@ciscospark/plugin-people';
import '@ciscospark/plugin-phone';

import Spark from '@ciscospark/spark-core';

export default function createSpark() {
  let redirectUri = `${window.location.protocol}//${window.location.host}`;
  if (window.location.pathname) {
    redirectUri += window.location.pathname;
  }
  const spark = new Spark({
    config: {
      appName: 'spark-widget-oauth-example',
      credentials: {
        client_id: process.env.CISCOSPARK_CLIENT_ID,
        redirect_uri: redirectUri,
        scope: 'spark:all spark:kms'
      },
      device: {
        ephemeral: true
      },
      phone: {
        enableExperimentalGroupCallingSupport: true
      }
    }
  });

  return new Promise((resolve) => {
    spark.on('ready', () => {
      console.log('spark ready');
      window.ciscosparkInstance = spark;
      resolve(spark);
    });
  });
}
