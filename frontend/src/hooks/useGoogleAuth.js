import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = (onAuthComplete) => {
  const [isLoading, setIsLoading] = useState(false);

  
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, // important for Expo Go
    });

    console.log(redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    expoClientId: WEB_CLIENT_ID,
    redirectUri, // use the static https redirect
  });

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        setIsLoading(true);
        try {
          await onAuthComplete(id_token);
        } catch (error) {
          console.error("onAuthComplete callback failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (response?.type === "error") {
        console.error("Google Auth Error:", response.error);
        setIsLoading(false);
      } else if (response?.type === "cancel") {
        setIsLoading(false);
      }
    };

    handleResponse();
  }, [response, onAuthComplete]);

  const signIn = () => {
    if (!isLoading) {
      promptAsync({ useProxy: true }); // ensures Expo proxy is used
    }
  };

  return { signIn, isLoading };
};
