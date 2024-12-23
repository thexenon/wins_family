import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import styles from "../../styles/globalStyles";

const API_KEY = "AIzaSyAcs0HOLMdImG5WQFBgnS8TqM7mgsQvnn0";
const CHANNEL_ID = "UCxq_M1XE1eqKcGZTDnguqCw";
// const CHANNEL_ID = "UCVEpDZoPL76eYMhfsLOwEbQ";
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=20&type=video&key=${API_KEY}`;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(YOUTUBE_API_URL);
        setVideos(response.data.items);
      } catch (error) {
        Alert.alert("Error", "Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ marginTop: 40, marginBottom: 20 }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text style={styles.youtubeText}>{item.snippet.title}</Text>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${item.id.videoId}`,
              }}
              style={{ minHeight: 500 }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Videos;
