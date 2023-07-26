import Pool from '../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const Account = {
    getSession: async () => {
        return await new Promise((res, rej) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        rej();
                    } else {
                        const attributes = await new Promise((res, rej) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    rej(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }

                                    res(results);
                                }
                            });
                        });

                        res({ user, ...session, ...attributes });
                    }
                });
            } else {
                rej();
            }
        });
    },
    authenticate: async (Username, Password) => {
        return await new Promise((res, rej) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({ Username, Password });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    res(data);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    rej(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    res(data);
                }
            });
        });
    },
    logOut: () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    },
    sendCodeToRevoveryPassword: async (Username) => {
        return await new Promise((res, rej) => {
            const user = new CognitoUser({ Username, Pool });

            user.forgotPassword({
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    res(data);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    rej(err);
                },
                inputVerificationCode: (data) => {
                    console.log("Input code: ", data);
                    res(data);
                }
            });
        });
    },
    resetPassword: async (Username, Code, Password) => {
        return await new Promise((res, rej) => {
            const user = new CognitoUser({ Username, Pool });

            user.confirmPassword(Code, Password, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    res(data);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    rej(err);
                }
            });
        });
    },
    getUserAttributes: async () => {
        return await new Promise((res, rej) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        rej();
                    } else {
                        const attributes = await new Promise((res, rej) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    rej(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }

                                    res(results);
                                }
                            });
                        });
                        res({ user, ...session, ...attributes });
                    }
                });
            } else {
                rej();
            }
        });
    },
};

export default Account;