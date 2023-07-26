import Account from "../components/AccountContext";


const Authorization = {
    GetToken: async () => {
        return await Account.getSession().then(async ({ idToken }) => {
            console.log("Session: ", idToken);

            const userSession = {
                idToken: idToken.jwtToken,
                attributes: idToken.payload
            }

            const token = userSession.idToken;
            return token;

        })

    },
    GetHeaders: async () => {
        var myHeaders = new Headers();
        const token = await Authorization.GetToken();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        return myHeaders;
    },
}

export default Authorization;