let exp = require("express");
let r = exp.Router();
let user_logic = require("../controller/user_logic");

r.get("/getuser", user_logic.get_all_user);
r.post("/user", user_logic.register);
r.delete("/getuser/:id", user_logic.delete_user);

module.exports = r;