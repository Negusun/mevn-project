import jwt from 'jsonwebtoken';
import models from '../models';
const secret = 'burusitademicorazonteextraniomucho';

async function check(token) {
    let id = null;
    try {
        const { _id } = await jwt.decode(toke);
        id = _id;
    } catch (error) {
        return false;
    }
    const user = await models.User.findOne({ _id: id }, { status: 1 });
    if (user) {
        const token = jwt.sign({ _id: id }, secret, { expiresIn: '1d' });
        return { token };
    }else
        return false;
}

export default {
    encode: async (id) => {
        const token = jwt.sign({ _id: id }, secret, { expiresIn: '1d' });
        return token;
    },
    decode: async (token) => {
        try {
            const { _id } = await jwt.verify(token, secret);
            const user = await models.User.findOne({ _id, status: 1 });
            if (user)
                return user;
            else
                return false;
        } catch (error) {
            const newToken = await check(token);
            return newToken;
        }
    }
}