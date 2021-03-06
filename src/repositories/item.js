const logging = require('../utils/logging');
const ItemModel = require('../models/item');
const Repository = require('./repository');

module.exports = class ItemRepository extends Repository {
    constructor(){
        super(ItemModel);
    }

    /**
     * Method that gets existing items by checklist id
     * 
     * @async
     * @param {string} checklistId 
     * @returns {Promise <Query>[]}
     * @memberof ItemRepository
     */
    async findAll(checklistId) {
        let existedItems = null

        try {
            existedItems = ItemModel.find({
                checklist: checklistId
            });
        } catch (error) {
            logging.error(`Failed to find all items by checklist id "${checklistId}" from database`);
            logging.error(error);

            throw error;
        }

        if (!existedItems) {
            throw new Error(`Items with checklist id "${checklistId}" don't exist`)
        }

        logging.info(`All Items have been successfully found by checklist id "${checklistId}"`);
        return existedItems;
    }
}