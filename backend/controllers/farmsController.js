const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
// const Farm = require('../generated/prisma/'); // Assuming you have a Farm model
const { validationResult } = require('express-validator');

// Controller to add a new farm
const addFarm = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, size, ownerId, location } = req.body;
        const userId = req.user.user_id; // Assuming user is authenticated and user id is in req.user
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (userId !== ownerId) {
            return res.status(403).json({ success: false, message: 'You can only add farms for yourself' });
        }
        if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
        }

        const farm = await prisma.farm.create({
            data: {
            name,
            size,
            location,
            ownerId: ownerId
            }
        });

        //await farm.save();

        res.status(201).json({ message: 'Farm added successfully', farm });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addFarm };
   