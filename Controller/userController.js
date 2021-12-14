const userService = require('../Service/userService');

class userController {
    async getUser(req, res) {
        const account = await userService.validateLogin(req.body.email, req.body.password);
        if (account) res.send(account);
        else res.send({ code: 1 }); //no user or wrong password
    }

    async createUser(req, res) {
        const newAccount = req.body;
        const valid = await userService.createNewUser(newAccount);
        if (valid === 0) res.send({ code: 0 }) // created;
        else res.send({ code: 1 }) //email has already use
    }

    async updateInfo(req, res) {
        const newInfo = req.body;
        const id = req.params.id
        const success = await userService.updateInfo(id, newInfo);
        if (success === 1) res.send({ code: 1 }); //duplicate email
        else res.send({ code: 0 }); //update success
    }

    async updatePassword(req, res) {
        const newPass = req.body.newPass;
        const id = req.params.id;
        const password = await userService.updatePassword(id, newPass);
        if (password) res.send({ password }) //new pass
        else res.send({ code: 1 }) //fail code
    }
}

module.exports = new userController