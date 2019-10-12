import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Article.create(req.body);
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
            const reg = await models.Article.findOne({ _id: req.query.id }).populate('category',{name:1});
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
    },queryCode: async (req, res, next) => {
        try {
            const reg = await models.Article.findOne({ code: req.query.code }).populate('category',{name:1});
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
            const reg = await models.Article.find(
                {
                    $or: [
                        { name: new RegExp(value, 'i') },
                        { description: new RegExp(value, 'i') }
                    ]
                }, { createdAt: 0 }
            )
                .populate('category', { name: 1 })
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
            const reg = models.Article.findByIdAndUpdate(
                { _id: req.body.id }, {
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            })
                .populate('category', { name: 1 });
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
            const reg = await models.Article.findByIdAndDelete({ _id: req.body.id });
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
            const reg = models.Article.findByIdAndUpdate({ _id: req.body.id }, { status: 1 });
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
            const reg = models.Article.findByIdAndUpdate({ _id: req.body.id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    }
}