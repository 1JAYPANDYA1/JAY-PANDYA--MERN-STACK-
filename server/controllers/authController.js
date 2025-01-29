const { signup, login,updateuser,getuser } = require('../services/authService');
const { generateToken } = require('../utils/jwtUtils');

const signupUser = async (req, res) => {
  const { name, email, password, mobilenumber } = req.body;

  const result = await signup(name, email, password, mobilenumber);

  res.status(200).json(result);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await login(email, password);

  if (result.success) {
    const token = generateToken({ id: result.user.id, email: result.user.email });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      expires: new Date(Date.now() + 60 * 5000)
    });
    
    result.token = token;
  }
  res.status(200).json(result);
};

const logOutUser=async(req,res)=>{
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ error: "Failed to log out" });
  }
}


const getUser=async(req,res)=>{
  try {
    const { userId } = req;
    const result = await getuser(userId);
    if (result.success) {
      res.status(200).json(result);
      };
  } catch (error) {
    return res.status(500).json({ error: "Failed to get user data" });
  }
}

const updateUser = async (req, res) => {
  try {
    const { userId } = req;
    const data = req.body;
    const result = await updateuser(userId,data);
    if (result.success) {
      res.status(200).json(result);
      }
      else{
        res.status(200).json(result);
      }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
};
 const hello=async(req,res)=>{
  try {
    res.status(200).json({message:"perfect"});
  } catch (error) {
    return res.status(500).json({ error: "Failed to checkuser" });
  }
 }
module.exports = { signupUser, loginUser,logOutUser,updateUser,getUser ,hello};
