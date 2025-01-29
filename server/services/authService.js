const prisma = require('../utils/prismaClient');
const { hashPassword, comparePassword } = require('../utils/hashUtils');

const signup = async (name, email, password, mobilenumber) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, message: 'Email Already Exists' };
  }

  const existingUser1 = await prisma.user.findFirst({ where: { mobilenumber:mobilenumber } });
  if(existingUser1){
    return { success: false, message: 'Mobile Number Exists' };
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, mobilenumber },
  });

  return { success: true, message: 'User Registered Successfully', user };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: 'User Not Found' };
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'Incorrect Password' };
  }

  return { success: true, message: 'Login Successful', user };
};
const updateuser = async (userId, user) => {
  try {
    const ud=await prisma.user.findFirst({where:{id:userId}})
    const existingUserWithEmail = await prisma.user.findFirst({
      where: {
        AND: [
          { email: user.email },
          { id: { not: userId } }
        ]
      }
    });
    
    if (existingUserWithEmail) {
      console.log("in email if ")
      return { success: false, message: 'Email Already Exists',user: ud };
    }

    const existingUserWithMobile = await prisma.user.findFirst({
      where: {
        AND: [
          { mobilenumber: user.mobilenumber },
          { id: { not: userId } }
        ]
      }
    });
    
    if (existingUserWithMobile) {
      console.log("in number if ")
      return { success: false, message: 'Mobile Number Already Exists' ,user: ud };
    }

    let hashedPassword;
    if (user.message === "password changed") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(user.password)) {
        return { 
          success: false, 
          message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.' 
          ,user: ud 
        };
      }
      console.log("before hashing : ",user.password )
      hashedPassword = await hashPassword(user.password);
    } else {
      console.log("without hashing : ",user.password )
      hashedPassword = user.password;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(user.mobilenumber)) {
      return { 
        success: false, 
        message: 'Mobile number must be 10 digits long and start with 6, 7, 8, or 9.' 
        ,user: ud 
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        mobilenumber: user.mobilenumber,
      },
    });

    return { success: true, message: "Update Successful", user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Update failed", error };
  }
};

const getuser=async(userId)=>{
try {
  const userdata=await prisma.user.findFirst({where:{id:userId}})
  return { success: true, message: "data found Successful", user: userdata };
} catch (error) {
  return { success: false, message: "user data failed", error };
}
}

module.exports = { signup, login,updateuser,getuser };
