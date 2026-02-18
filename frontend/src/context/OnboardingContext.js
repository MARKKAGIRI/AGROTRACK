import { createContext, useContext } from "react";

export const OnboardingContext = createContext();


export const useOnboarding = () => useContext(OnboardingContext);