module.exports = {
    'GET /api/paper': {
        data: {
            id: 11,
        },
        time: null,
        message: '',
        status: 0,
    },

    'POST /api/users': function (req, res) {
        console.warn('post record:=========================');
        console.warn(req.body);
        res.json({
            data: {
                id: 14,
            },
            time: null,
            message: '',
            status: 0,
        });
    },
};
