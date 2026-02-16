const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Update User Profile Picture
const updateUserImage = async (req, res) => {
  const { userId } = req.params;
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        profilePicture: imageUrl 
      },
    });

    res.status(200).json({ 
      message: "Profile picture updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating user image:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

const updateFarmImage = async (req, res) => {
  const { farmId } = req.params;
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    // We use 'push' to add the new image to the existing list
    const updatedFarm = await prisma.farm.update({
      where: { id: farmId },
      data: {
        images: {
          push: imageUrl 
        }
      }
    });

    res.status(200).json({ 
      message: "Farm image added successfully", 
      farm: updatedFarm 
    });
  } catch (error) {
    console.error("Error adding farm image:", error);
    res.status(500).json({ error: "Failed to add farm image" });
  }
};

const deleteFarmImage = async (req, res) => {
  const { farmId } = req.params;
  const { imageUrl } = req.body;

  try {
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });

    if (!farm) return res.status(404).json({ error: "Farm not found" });

    const newImages = farm.images.filter((img) => img !== imageUrl);
    await prisma.farm.update({
      where: { id: farmId },
      data: { images: newImages },
    });

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

module.exports = { updateUserImage, updateFarmImage, deleteFarmImage };