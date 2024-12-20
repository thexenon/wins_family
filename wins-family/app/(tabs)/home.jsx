import { useCallback, useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import styles from "../../styles/globalStyles";

// const link = "http://127.0.0.1:3000";
const link = "https://wins-family.onrender.com";

const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const options = {
    method: "GET",
    url: `${link}/api/v1/scriptures/`,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data.data);
      setIsLoading(false);
      setStatus(response.data.status);
    } catch (error) {
      setError(error);
      alert("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.searchcontainer}>
          <View>
            <Text style={styles.searchwelcomeMessage}>
              Welcome to Wins Family
            </Text>
          </View>
          <View style={styles.searchsearchContainer}>
            <View style={styles.searchsearchWrapper}>
              <TextInput
                style={styles.searchsearchInput}
                placeholder="Search Scriptures"
              />
            </View>
            <TouchableOpacity style={styles.searchsearchBtn}>
              <Image
                source={icons.search}
                resizeMode="contain"
                style={styles.searchsearchBtnImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.homecontainer}>
            <View style={styles.homeheader}>
              <Text style={styles.homeheaderTitle}>All Scriptures</Text>
              <TouchableOpacity>
                <Text style={styles.homeheaderBtn}>Show All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.homecardsContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : error ? (
                <Text>Something Went Wrong!!!</Text>
              ) : data.length === 0 || data == null ? (
                <Text>No Data!!!</Text>
              ) : (
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <ScriptureCard
                      handleNavigate={() => {
                        router.push(`/scripture-details/${item._id}`);
                      }}
                      scripture={item}
                    />
                  )}
                  keyExtractor={(data) => data?._id}
                  contentContainerStyle={{ columnGap: SIZES.medium }}
                  vertical
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const ScriptureCard = ({ scripture, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleNavigate()}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: scripture?.fileSRC }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {scripture?.title}
        </Text>
        <Text style={styles.jobType}>{scripture?.summary}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Home;
