const logging = require('../utils/logging');
const ChecklistModel = require('../models/checklist');

module.exports = class ChecklistRepository {
    /**
     * Method that inserts new chechlist into database
     * 
     * @async
     * @param {Object} checklist
     * @param {ObjectId[]} chechlist.items
     * @param {ObjectId[]} chechlist.users
     * @param {boolean} item.isActive
     * @param {Date} chechlist.created
     * @param {?Date} chechlist.modified
     * @param {ObjectId} chechlist.createdBy
     * @param {ObjectId} chechlist.modifiedBy
     * @returns {Promise <Query>}
     * @memberof ChecklistRepository
     */
    async insert(checklist) {
        let createdChecklist = null

        try {
            checklist.created = new Date();

            checklist = new ChecklistModel(checklist)

            await checklist.save();

            createdChecklist = await ChecklistModel.findById(checklist._id).populate('items');
        } catch (error) {
            logging.error(`Failed to insert new checklist`);
            logging.error(error);

            throw error;
        }

        if (!createdChecklist) {
            throw new Error('Failed to get checklist after it\'s been saved')
        }

        logging.info(`New checklist "${createdChecklist._id}" has been successfully created`);
        return createdChecklist;
    }

    /**
     * Method that gets existing checklist by checklist id
     * 
     * @async
     * @param {ObjectId} checklistId 
     * @returns {Promise <Query>}
     * @memberof ChecklistRepository
     */
    async findbyId(checklistId) {
        let existedChecklist = null

        try {
            existedChecklist = await ChecklistModel.findById(checklistId).populate('items');
        } catch (error) {
            logging.error(`Failed to find checklist by id "${checklistId}" from database`);
            logging.error(error);

            throw error;
        }

        if (!existedChecklist) {
            throw new Error(`Checklist with id "${checklistId}" doesn't exist`)
        }

        logging.info(`Checklist has been successfully found by id "${checklistId}"`);
        return existedChecklist;
    }

    /**
     * Method that gets existing checklists by user id
     * 
     * @async
     * @param {ObjectId} userId 
     * @returns {Promise <Query>[]}
     * @memberof ChecklistRepository
     */
    async findAll(userId) {
        let existedChecklists = null

        try {
            existedChecklists = await ChecklistModel.find({
                users: userId
            }).populate('items');
        } catch (error) {
            logging.error(`Failed to find all checklists by user id "${userId}" from database`);
            logging.error(error);

            throw error;
        }

        if (!existedChecklists) {
            throw new Error(`Checklists with user id "${userId}" don't exist`)
        }

        logging.info(`All checklists have been successfully found by user id "${userId}"`);
        return existedChecklists;
    }

    /**
     * Method that updates existing chechlist into database
     * 
     * @async
     * @param {ObjectId} id
     * @param {Object} data
     * @param {ObjectId[]} data.items
     * @param {ObjectId[]} data.users
     * @param {boolean} data.isActive
     * @param {?Date} data.modified
     * @param {ObjectId} data.modifiedBy
     * @returns {Promise <Query>}
     * @memberof ChecklistRepository
     */
    async update(id, data) {
        let updatedChecklist = null;

        try {
            updatedChecklist = await ChecklistModel.findOneAndUpdate({
                _id: id
            }, data, {
                new: true
            }).populate('items');
        } catch (error) {
            logging.error(`Failed to update checklist with id "${id}"`)
            logging.error(error);

            throw error;
        }

        if (!updatedChecklist) {
            throw new Error(`Failed to get updated checklist with id "${id}"`)
        }

        logging.info(`Checklist "${updatedChecklist._id}" has been succesfully updated`);

        return updatedChecklist;
    }


    /**
     * Method that deletes existing chechlist from db
     * 
     * @async
     * @param {ObjectId} id
     * @returns {Promise <Query>}
     * @memberof ChecklistRepository
     */
    async delete(id) {
        let deletedChecklist = null;

        try {
            deletedChecklist = await ChecklistModel.findOneAndRemove({
                _id: id
            });
        } catch (error) {
            logging.error(`Failed to delete checklist with id "${id}"`)
            logging.error(error);

            throw error;
        }

        if (!deletedChecklist) {
            throw new Error(`Failed to get deleted checklist with id "${id}"`)
        }

        logging.info(`Checklist "${deletedChecklist._id}" has been succesfully deleted`);

        return deletedChecklist;
    }
}