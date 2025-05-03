let user = require("../collection/User");
let bcrypt = require("bcrypt");

let user_function = {
  register: async function (req, res) {
    try {
      let { name, email, password, gender, age } = req.body;
      let email_check = await user.findOne({ email: email });
      if (email_check) {
        return res.status(409).json({ msg: "Email Already Exists" });
      } else {
        let enc_pswd = bcrypt.hashSync(password, 15);
        let user_data = new user({ name, email, password: enc_pswd, gender, age });
        let save_data = await user_data.save();
        res.status(200).json({ msg: "User registered successfully" });
      }
    } catch (error) {
      res.status(501).json({ msg: "Registration failed: " + error.message });
    }
  },

  get_all_user: async function (req, res) {
    try {
      let user_record = await user.find().select("-password").sort({ record_at: -1 });
      return res.status(200).json(user_record);
    } catch (error) {
      res.status(501).json({ msg: "Failed to load users: " + error.message });
    }
  },

  delete_user: async function (req, res) {
    try {
      let { id } = req.params;
      await user.findByIdAndDelete(id);
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      res.status(501).json({ msg: "Deletion failed: " + error.message });
    }
  }
};

module.exports = user_function;