const express = require('express');
const app = express();

app.get('/', (res, req) => {
  res.json({
    message: 'Hello Blog post project is working fine',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
