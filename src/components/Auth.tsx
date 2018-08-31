import * as React from "react";
import * as Firebaseui from "react-firebaseui";
import firebase from "../utils/firebase";

interface IProps {
  onAuthSuccessfull: (p: any) => void;
}

export const Auth: React.SFC<IProps> = (props: IProps) => {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: props.onAuthSuccessfull
    },

    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  };

  return (
    <Firebaseui.StyledFirebaseAuth
      uiCallback={(ui: any) => ui.disableAutoSignIn()}
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default Auth;
