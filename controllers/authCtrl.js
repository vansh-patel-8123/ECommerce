const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user is already exits
        const exitingUser = await User.findOne({ email: email });
        if (exitingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const payload = {
            user: {
                id: newUser.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Return the token and user details in the response
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user is exit
        const user = await User.findOne({ email: email })

        // user don't exits
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // password is wrong
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user details in the response
        res.json({ token, user });

    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProfile = async (req, res) => {
    try {
        // user ID is extracted from the authenticated user's token via middleware
        const userId = req.user.id;

        // find user in DB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user profile details in the response
        res.json({ user });

    }
    catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Internal server error' });

    }

};

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const userId = req.user.id; // Assuming you have the user ID available from the authenticated request

        // Find the user by ID and update the profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });

    }
    catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = { registerUser, loginUser, getProfile, updateProfile }
