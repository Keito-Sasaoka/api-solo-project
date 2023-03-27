const { setupServer } = require("./server");
const port = 3001;
const app = setupServer();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
