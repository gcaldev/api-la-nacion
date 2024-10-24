const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountsRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/v1/api/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
