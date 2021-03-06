const UserRepo = require('../repositories/user');

module.exports = class UserController {

    constructor() {
        this.userRepo = new UserRepo();
    }

    async addNewUser(user) {
        let newUser;

        try {
            newUser = await this.userRepo.insert(user);
        } catch (error) {
            throw error;
        }

        return newUser;
    }

    async getUserById(id) {
        let existingUser;

        try {
            existingUser = await this.userRepo.findById(id);

        } catch (error) {
            throw error;
        }

        return existingUser;
    }

    async getUserByUsername(username) {
        let existingUser;

        try {
            existingUser = await this.userRepo.findByUsername(username);

        } catch (error) {
            throw error;
        }

        return existingUser;
    }

    async getAllUsersByChecklistId(checlistId) {
        let existingUsers;

        try {
            existingUsers = await this.userRepo.findAllByChecklistId(checlistId);

        } catch (error) {
            throw error;
        }

        return existingUsers;
    }

    async updateUser(id, data) {
        let updateUser;

        try {
            updateUser = await this.userRepo.update(id, data);
        } catch (error) {
            return error;
        }

        return updateUser;
    }
};