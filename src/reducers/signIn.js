const initialState = {
    signedInUser: null
};

export default function signIn(state = initialState, action) {
    switch(action.type) {
        case "SIGN_IN_WITH_GOOGLE": {
            return {
                signedInUser: action.signedInUser,
            };
        }
        default: {
            return state;
        }
    }
}