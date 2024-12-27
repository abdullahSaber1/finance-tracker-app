/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from "react";
import {Platform, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {persistor, store} from "./store/configureStore";
import {PersistGate} from "redux-persist/integration/react";
import RootNavigation from "./navigation/RootNavigation";
import FlashMessage from "react-native-flash-message";
import {connectToDatabase, createTables, getTableNames} from "./db/db-service";
import SplashScreen from "react-native-splash-screen";
import {SCALE} from "./constants";

const {mvs} = SCALE;

function App(): JSX.Element {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
      const tabels = await getTableNames(db);
      console.log("tabels", tabels);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData().then(() => {
      SplashScreen.hide();
    });
  }, []);

  return (
    <SafeAreaProvider style={styles.rootScreen}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FlashMessage position="top" />
          <RootNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {paddingTop: Platform.OS === "ios" ? mvs(40) : 0},
});

export default App;
