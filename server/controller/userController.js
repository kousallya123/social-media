const Users = require('../model/user')
const bcrypt = require('bcrypt')


const ctrlRegister = async (req, res) => {
  try {
    const { name, email, password,image } = JSON.parse(req.body.newPost);

    let newUserName = name.toLowerCase();

    const user_name = await Users.findOne({ username: newUserName });

    if (user_name) return res.json({ message: 'This username is already exists' });

    const user_email = await Users.findOne({ email });

    if (user_email) return res.json({ message: 'This email is already exists' });

    if (password.length < 6) return res.json({ message: 'Password must be at least 6 characters' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username: newUserName,
      email,
      profileImage: image,
      password: passwordHash,
    });
console.log(newUser,'newUser')
    const user = await newUser.save();

    res.json({ message: 'User is registered', user });
  } catch (error) {
    return res.json({ message: error.message });
  }
};



const ctrlLogin = async (req, res) => {
    try {
      const { email, password } = req.body
  
      const user = await Users.findOne({ email })
  
      if (!user) return res.json({ message: 'Could not find the user' })
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) return res.json({ message: "Password is incorrect" })

      res.json({ message: "Login success", user: user })
  
    } catch (error) {
      return res.json({ message: error.message })
    }
  }


module.exports={ctrlLogin,ctrlRegister}