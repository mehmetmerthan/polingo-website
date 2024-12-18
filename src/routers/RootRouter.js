import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {
  Authenticator,
  ThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import BottomTab from "./BottomTab";
import config from "../amplifyconfiguration.json";
Amplify.configure(config);
const theme = {
  overrides: [defaultDarkModeOverride],
};
export default function RootRouter() {
  return (
    <ThemeProvider theme={theme} colorMode={"dark"}>
      <Authenticator.Provider>
        <Authenticator>
          <NavigationContainer theme={DarkTheme}>
            <BottomTab />
          </NavigationContainer>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
