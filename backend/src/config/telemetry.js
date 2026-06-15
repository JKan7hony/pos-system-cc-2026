// src/config/telemetry.js
const appInsights = require('applicationinsights');
require('dotenv').config();

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

if (connectionString) {
  appInsights.setup(connectionString)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true) // Intercepta automáticamente los console.log y los manda a Azure
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .setInternalLogging(true, true)
    .start();

  appInsights.defaultClient.config.samplingPercentage = 100;
  appInsights.defaultClient.config.maxBatchSize = 0;

  appInsights.defaultClient.trackTrace({
    message: 'Application Insights conectado desde backend POS',
    severity: 1
  });

  appInsights.defaultClient.trackEvent({
    name: 'APP_INSIGHTS_TEST_EVENT'
  });

  appInsights.defaultClient.flush();

  console.log('✅ Azure Application Insights inicializado correctamente.');
} else {
  console.warn('⚠️ APPLICATIONINSIGHTS_CONNECTION_STRING no encontrada. Corriendo sin telemetría cloud.');
}

module.exports = appInsights;
