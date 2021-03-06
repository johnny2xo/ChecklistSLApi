const config = require('config');
const ChecklistController = require('../controllers/checklist.js');


module.exports = (router, authenticate) => {
    this.checklistController = new ChecklistController();

    router.post('/checklist', authenticate, (req, res, next) => {
        this.checklistController.addNewChecklist(req.body.checklist, req.user)
            .then((checklist) => {
                res.json(checklist);
            }).catch((error) => {
                next(error);
            });
    });

    router.patch('/checklist/:id', authenticate, (req, res, next) => {
        this.checklistController.updateChecklist(req.params.id, req.body.checklist, req.user)
            .then((checklist) => {
                res.json(checklist);
            }).catch((error) => {
                next(error);
            });
    });

    router.put('/checklist/:id/item', authenticate, (req, res, next) => {
        this.checklistController.addItemToChecklist(req.params.id, req.body.item, req.user)
            .then((item) => {
                res.json(item);
            }).catch((error) => {
                next(error);
            });
    });

    router.patch('/checklist/:id/item/:itemId', authenticate, (req, res, next) => {
        this.checklistController.updateItemInChecklist(req.params.id, req.params.itemId, req.body.item, req.user)
            .then((item) => {
                res.json(item);
            }).catch((error) => {
                next(error);
            });
    });

    router.delete('/checklist/:id/item/:itemId', authenticate, (req, res, next) => {
        this.checklistController.deleteItemFromChecklist(req.params.id, req.params.itemId, req.user)
            .then((item) => {
                res.json(item);
            }).catch((error) => {
                next(error);
            });
    });

    router.delete('/checklist/:id', authenticate, (req, res, next) => {
        this.checklistController.deleteChecklistById(req.params.id)
            .then((checklist) => {
                res.json(checklist);
            }).catch((error) => {
                next(error);
            });
    });
};