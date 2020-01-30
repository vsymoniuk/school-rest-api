module.exports.catch = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error,
    });
};

module.exports.response = (res, code, message) => {
    res.status(code).json({
        success: false,
        message,
    });
};