const { User } = require("../models");

app.get("/api/users", async (res, req) => {
  try {
    const result = await User.find();
  } catch (e) {
    res.status(500).send(e);
  }
});
