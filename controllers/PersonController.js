import models from '../models';

export default {
    add: async (req, res, next) => {
        try {            
            const reg = await models.Person.create(req.body);
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
            const reg = await models.Person.findOne({ _id: req.query.id });
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
            const reg = await models.Person.find(
                {
                    $or: [
                        { name: new RegExp(value, 'i') },
                        { email: new RegExp(value, 'i') }
                    ]
                }, { password: 0 }
            )
                .sort({ createdAt: -1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },listClients: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Person.find(
                {
                    $or: [
                        { name: new RegExp(value, 'i') },
                        { email: new RegExp(value, 'i') }
                    ],
                    person_type: 'Client'
                }
            )
                .sort({ createdAt: -1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },listProviders: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Person.find(
                {
                    $or: [
                        { name: new RegExp(value, 'i') },
                        { email: new RegExp(value, 'i') },
                    ],
                    person_type: 'Provider'
                }
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
            models.Person.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    person_type: req.body.rol,
                    name: req.body.name,
                    document_type: req.body.document_type,
                    document_number: req.body.document_number,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email
                },
                { new: true },
                (err, newUser) => {
                    if (err) {
                        res.status(500).json({
                            message: 'An error has occurred'
                        });
                    } else {
                        res.status(200).json(newUser);
                    }

                });
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Person.findByIdAndDelete({ _id: req.body.id });
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
            const reg = models.Person.findByIdAndUpdate({ _id: req.body.id }, { status: 1 });
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
            const reg = models.Person.findByIdAndUpdate({ _id: req.body.id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    }
}