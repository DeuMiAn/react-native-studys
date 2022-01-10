import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import reactDom from "react-dom";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SectionList } from "react-native-web";
import { overlayColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "f8735368f3660b08d7a5ae8308df75cd";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Snow: "snow",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

console.log(SCREEN_WIDTH);
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  // const [weatherState, setWeatherState] = useState("rgba(0,0,0,1)");
  // const setWeatherColor = (temp) => {
  //   //hot rgba(250,80,80,1)`
  //   //cold rgba(100,100,255,1)
  //   //very cold rgba(150,150,255,1)
  //   if (temp < 0) {
  //     setWeatherState("rgba(150,150,255,1)");
  //   }
  // };

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    console.log(location);
    setCity(location[0].city ===null ? location[0].district: location[0].city);
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.constainer}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={70}
                  color="white"
                />
              </View>

              <Text style={styles.dexcription}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              <Text style={styles.date}>
                {new Date(day.dt * 1000).toString().substring(0, 10)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 18,
  },
  temp: {
    color: "white",
    marginTop: 50,
    fontSize: 180,
  },
  dexcription: {
    justifyContent: "flex-start",
    color: "white",
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    color: "white",
    fontSize: 20,
  },
  date: {
    alignSelf: "center",
    color: "white",
    fontSize: 30,
  },
});
