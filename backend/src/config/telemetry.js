// src/config/telemetry.js
require('dotenv').config();

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
let appInsights = null;

if (connectionString) {
  // Intentar inicializar con el nuevo SDK de OpenTelemetry (Azure Monitor)
  try {
    const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
    useAzureMonitor();
    console.log('✅ [Azure Monitor] OpenTelemetry inicializado de forma nativa para Chile Central.');
  } catch (error) {
    // Si no está instalado, usar el SDK de applicationinsights
    try {
      appInsights = require('applicationinsights');
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
      console.log('✅ Azure Application Insights inicializado correctamente (Fallback).');
    } catch (err) {
      console.error('❌ Error al inicializar la telemetría de Azure:', err);
    }
  }
} else {
  console.warn('⚠️ APPLICATIONINSIGHTS_CONNECTION_STRING no encontrada. Corriendo sin telemetría cloud.');
}

module.exports = appInsights;