const Admin = require("../models/adminModel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const allAdmins = (req, res) => {
    Admin.find({ is_delete: false })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneAdmin = async (req, res) => {
    const id = req.params.id;
    const user = await Admin.find({ _id: id, is_delete: false });
    res.json(user);
};

const newAdmin = async (req, res, next) => {

    const { username, email, password, phone } = req.body;

    try {
        const user = await Admin.findOne({ email: email });
        if (user) {
            return res.status(401).send("Email already taken");
        }
    } catch (error) {
        errorHandler(error, req, res);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        role: 'admin',
        username: username,
        email: email,
        password: hashedPwd,
        phone: phone,
    });

    const user = await newAdmin.save();

    req.body = user;
    next();
};

const updateAdmin = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const userData = await Admin.findById(userId);

    if (!(await bcrypt.compare(userData.password, updatedUserData.password)) || updatedUserData.is_delete) {

        return res.status(401).send("incorrect password");
    }

    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
    const user = await Admin.findByIdAndUpdate(userId, updatedUserData, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};

const deleteAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        updatedUserData.is_delete = true;

        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

        const user = await Admin.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
        });

        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update admin' });
    }
};


module.exports = {
    allAdmins,
    newAdmin,
    oneAdmin,
    updateAdmin,
    deleteAdmin,
}; 