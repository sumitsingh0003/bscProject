const getMissingError = (item) => {
    return `${item} is Missing`;
}

exports.addStudent = (req, res, next) => {
    const {name, email, dob, address, qualification} = req.body;

    if(!name){
        return res.status(400).json({status: 'failure', message: getMissingError('name')});
    }
    if(!email){
        return res.status(400).json({status: 'failure', message: getMissingError('email')});
    }
    if(!dob){
        return res.status(400).json({status: 'failure', message: getMissingError('dob')});
    }
    if(!address){
        return res.status(400).json({status: 'failure', message: getMissingError('address')});
    }
    if(!qualification){
        return res.status(400).json({status: 'failure', message: getMissingError('qualification')});
    }

    next();
}
