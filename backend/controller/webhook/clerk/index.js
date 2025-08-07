require('dotenv').config();
const { PrismaClient } = require('../../../generated/prisma/client');
const prisma = new PrismaClient();




async function createUser(data) {
  const userData = data;
  const email = userData.email_addresses
    ? userData.email_addresses[0]?.email_address
    : userData.email; // fallback if structure is different

  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: userData.id,
        email,
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
      }
    });
    console.log("User created successfully:", newUser.id);
    // console.log("User data:", {
    //   clerkId: userData.id,
    //   email,
    //   firstName: userData.first_name || null,
    //   lastName: userData.last_name || null,
    // });   
    
  } catch (error) {
    console.error("Error creating user:", error);
    // Remove res.status... (res is not defined here)
  }
};

module.exports = { createUser };