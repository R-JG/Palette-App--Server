const { PORT } = require('./utils/config');
const { infoLog } = require('./utils/logger');
const app = require('./app');

app.listen(PORT, () => {
    infoLog(`server running on port: ${PORT}...`);
});