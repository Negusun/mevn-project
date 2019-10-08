import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Category.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Category.findOne({ _id: req.query.id });
            if (!reg) {
                res.status(404).json({
                    message: 'The resource does not exist'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Category.find(
                {
                    $or: [
                        { name: new RegExp(value, 'i') },
                        { description: new RegExp(value, 'i') }
                    ]
                }, { createdAt: 0 }
            )
                .sort({ createdAt: -1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const reg = models.Category.findByIdAndUpdate(
                { _id: req.body.id }, {
                name: req.body.name,
                description: req.body.description
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Category.findByIdAndDelete({ _id: req.body.id });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = models.Category.findByIdAndUpdate({ _id: req.body.id }, { status: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = models.Category.findByIdAndUpdate({ _id: req.body.id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    }
}