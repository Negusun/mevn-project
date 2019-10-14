import models from '../models';

async function increaseStock(article_id, amount) {
    let { stock } = await models.Article.findOne({ _id: article_id });
    let nStock = parseInt(stock) + parseInt(amount);
    await models.Article.findByIdAndUpdate(
        { _id: article_id },
        { stock: nStock }
    );
}

async function decreaseStock(article_id, amount) {
    let { stock } = await models.Article.findOne({ _id: article_id });
    let nStock = parseInt(stock) - parseInt(amount);
    await models.Article.findByIdAndUpdate(
        { _id: article_id },
        { stock: nStock }
    );
}

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Sale.create(req.body);

            let detail = req.body.detail;
            detail.map(x => {
                decreaseStock(x._id, x.number)
            });

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
            const reg = await models.Sale.findOne({ _id: req.query.id })
                .populate('user', { name: 1 })
                .populate('person', { name: 1 });
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
            const reg = await models.Sale.find(
                {
                    $or: [
                        { voucher_number: new RegExp(value, 'i') },
                        { voucher_serie: new RegExp(value, 'i') }
                    ]
                }
            )
                .populate('user', { name: 1 })
                .populate('person', { name: 1 })
                .sort({ createdAt: -1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    listByDate: async (req, res, next) => {
        try {
            let start = req.body.start;
            let end = req.body.end;
            const reg = await models.Sale.find(
                { 'createdAt': { '$gte': start, '$lt': end } }
            )
                .populate('user', { name: 1 })
                .populate('person', { name: 1 })
                .sort({ createdAt: -1 });
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
            models.Sale.findByIdAndUpdate(
                { _id: req.body.id },
                { status: 1 },
                { new: true },
                (err, sale) => {
                    if (err) {
                        res.status(500).send({
                            message: 'An error has occurred'
                        });
                    } else {
                        let detail = sale.detail;
                        detail.map(x => {
                            decreaseStock(x._id, x.number)
                        });
                        res.status(200).send(sale);
                    }
                });
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            models.Sale.findByIdAndUpdate(
                { _id: req.body.id },
                { status: 0 },
                { new: true },
                (err, sale) => {
                    if (err) {
                        res.status(500).send({
                            message: 'An error has occurred'
                        });
                    } else {
                        let detail = sale.detail;
                        detail.map(x => {
                            increaseStock(x._id, x.number)
                        });
                        res.status(200).send(sale);
                    }
                });
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    statistics: async (req, res, next) => {
        try {
            const reg = await models.Sale.aggregate(
                [
                    {
                        $group: {
                            _id: {
                                month: { $month: '$createdAt' },
                                year: { $year: '$createdAt' }
                            },
                            total: { $sum: '$total' },
                            number: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id.year': -1,
                            '_id.month': -1
                        }
                    }
                ]
            ).limit(12);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    }
}