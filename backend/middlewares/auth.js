import tokenService from '../services/token';

export default {
    checkUser: async (req, res, next) => {
        if(!req.headers.token)
            res.status(404).json({message: 'Token not found'});
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Grocer' || response.rol == 'Vendor')
            next();
        else
            return res.status(403).json({message: 'Not Authorized'});
    },
    checkUserAdmin: async (req, res, next) => {
        if(!req.headers.token)
            res.status(404).json({message: 'Token not found'});
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin')
            next();
        else
            return res.status(403).json({message: 'Not Authorized'});
    },
    checkUserGrocer: async (req, res, next) => {
        if(!req.headers.token)
            res.status(404).json({message: 'Token not found'});
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Grocer')
            next();
        else
            return res.status(403).json({message: 'Not Authorized'});
    },
    checkUserVendor: async (req, res, next) => {
        if(!req.headers.token)
            res.status(404).json({message: 'Token not found'});
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Vendor')
            next();
        else
            return res.status(403).json({message: 'Not Authorized'});
    }
}