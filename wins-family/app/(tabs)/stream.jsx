import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import { ErrorView } from "../../components";
import styles from "../../styles/globalStyles";
import { COLORS } from "../../constants";

const API_KEY = "AIzaSyAcs0HOLMdImG5WQFBgnS8TqM7mgsQvnn0";
const CHANNEL_ID = "UCVEpDZoPL76eYMhfsLOwEbQ";
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;

const Stream = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        const response = await axios.get(YOUTUBE_API_URL);
        setLiveStreams(response.data.items);
      } catch (error) {
        setError(error);
        Alert.alert("Something went wrong.", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStreams();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.safeSpace}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <ErrorView msg={"Something went wrong. Please try again"} />
        ) : liveStreams.length === 0 || liveStreams == null ? (
          <ErrorView
            msg={
              "No Live Streams ongoing at the moment. Kindly come back later. Or watch some Scripture Videos in the next tab."
            }
          />
        ) : (
          <View>
            <FlatList
              data={liveStreams}
              keyExtractor={(item) => item.id.videoId}
              renderItem={({ item }) => (
                <View style={{ margin: 10, height: 200 }}>
                  <Text>{item.snippet.title}</Text>
                  <WebView
                    source={{
                      uri: `https://www.youtube.com/embed/${item.id.videoId}`,
                    }}
                    style={{ height: 180 }}
                  />
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stream;
