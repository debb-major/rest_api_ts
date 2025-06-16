import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';
import { UserModel } from '../db/users';

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password, username } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const login = async(req: express.Request, res: express.Response) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        //authenticating users without knowing their passwords; use of hash comparisons

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('DEBB-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();


    } catch(error) {
        console.log(error)
        return res.sendStatus(400)
    }
}