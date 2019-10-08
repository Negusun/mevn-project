import models from '../models';
import bcrypt from 'bcryptjs';
import tokenService from '../services/token';

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body);
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
            const reg = await models.User.findOne({ _id: req.query.id });
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
            const reg = await models.User.find(
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
    },
    update: async (req, res, next) => {
        try {

            const user = await models.User.findOne({ _id: req.body.id });
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            models.User.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    rol: req.body.rol,
                    name: req.body.name,
                    document_type: req.body.document_type,
                    document_number: req.body.document_number,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password
                },
                { new: true },
                (err, newUser) => {
                    if (err) {
                        res.status(500).send({
                            message: 'An error has occurred'
                        });
                    } else {
                        res.status(500).send(newUser);
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
            const reg = await models.User.findByIdAndDelete({ _id: req.body.id });
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
            const reg = models.User.findByIdAndUpdate({ _id: req.body.id }, { status: 1 });
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
            const reg = models.User.findByIdAndUpdate({ _id: req.body.id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            let user = await models.User.findOne({ email: req.body.email, status: 1 });
            if (user) {
                let match = await bcrypt.compareSync(req.body.password, user.password);
                if (match) {
                    let token = await tokenService.encode(user._id);
                    user = { rol: user.rol, name: user.name, email: user.email };
                    res.status(200).json({ user, token });
                }
                else
                    res.status(404).json({ message: 'User not found' })
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).send({
                message: 'An error has occurred'
            });
            next(error);
        }
    }
}