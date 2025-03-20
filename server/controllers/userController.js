const User = require('../models/User');

class UserController {
    async createUser(req, res){
        
        try{
            const {email, name, } = req.body;
            const newUser = new User({email, name});

            const user = await newUser.save();
            return res.status(201).json({message: "User created successfully", user});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async getAllUsers(req, res){
        try{
            const {page, limit, orderBy = "createdAt", sortBy = -1} = req.query;
            const offset = (page - 1) * limit;

            const users = await User.find().limit(limit).skip(offset).sort({[orderBy]: parseInt(sortBy)}).populate("posts", "title content");

            return res.status(200).json({message: "User fetched successfully!", users});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const { email, name } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { email, name },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User updated successfully", updatedUser });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();