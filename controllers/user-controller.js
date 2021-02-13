const { User } = require("../models");

app.get("/api/users", async (res, req) => {
  const result = await User.find();
});
