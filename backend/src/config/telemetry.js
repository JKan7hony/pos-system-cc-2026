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
    .start();

  console.log('✅ Azure Application Insights inicializado correctamente.');
} else {
  console.warn('⚠️ APPLICATIONINSIGHTS_CONNECTION_STRING no encontrada. Corriendo sin telemetría cloud.');
}

module.exports = appInsights;
