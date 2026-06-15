const appInsights = require('./config/telemetry');

const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor POS corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);

  if (appInsights.defaultClient) {
    appInsights.defaultClient.trackTrace({
      message: 'POS backend iniciado correctamente',
      severity: 1
    });

    appInsights.defaultClient.trackEvent({
      name: 'POS_BACKEND_START'
    });

    appInsights.defaultClient.flush();
  }
});
