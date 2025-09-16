import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [city, setCity] = useState('Delhi');   
  const [weather, setWeather] = useState(null);

  const API_KEY = 'cf2378d1deec32c8f1e6995d8bcac1fe'; 

  // Fetch weather function
  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Function to return weather icon name
  const getWeatherIcon = (condition) => {
    if (!condition) return "weather-cloudy";

    condition = condition.toLowerCase();
    if (condition.includes("cloud")) return "weather-cloudy";
    if (condition.includes("clear")) return "weather-sunny";
    if (condition.includes("rain")) return "weather-rainy";
    if (condition.includes("snow")) return "weather-snowy";
    if (condition.includes("storm") || condition.includes("thunder")) return "weather-lightning";
    if (condition.includes("mist") || condition.includes("fog")) return "weather-fog";
    return "weather-cloudy";
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>🌤️ Weather App</Text>

      {/* Input box */}
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      {/* Custom button */}
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {/* Weather Card */}
      {weather && (
        <View style={styles.card}>
          {/* Dynamic weather icon */}
          <MaterialCommunityIcons
            name={getWeatherIcon(weather.weather[0].main)}
            size={80}
            color="#ff9800"
          />

          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.condition}>{weather.weather[0].description}</Text>
          <Text style={styles.details}>💧 Humidity: {weather.main.humidity}%</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  condition: {
    fontSize: 20,
    fontStyle: 'italic',
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
});
