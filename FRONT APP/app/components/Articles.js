import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import {  TouchableOpacity, FlatList, Image } from 'react-native';

import 'react-native-gesture-handler';
import client from '../api/client';
import { useLogin } from "../context/LoginProvider";


const Articles = ({ navigation }) => {
    const { profile,setProfile } = useLogin();
    const [posts, setPosts] = useState([]);
    const getAllPosts= async () => {
        const token = await AsyncStorage.getItem('token');

        client.get(`getAllArticle`,{headers:{
            Authorization:`JWT ${token}`
        }})
        .then(response => {
            setPosts(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    
    const CardPost = ({ item }) => {
        return (
          <TouchableOpacity style={styles.card}>
            <Image source={{uri:item.image}} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.nom}</Text>
              <Text style={styles.description}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        );
      };
  return (
   <View style={styles.container}>
      {/* {posts.map(post => (
        <View key={post.id}>
          <Image source={{uri:post.image}} style={{ width: 250, height: 250 , borderRadius: 25}} />
          <Text>{post.nom}</Text>
          <Text>{post.prix}</Text>

          <Text>{post.desc}</Text>
          <Text>{post.catigorie}</Text>
          <Text>{post.status}</Text>
          <Text>{post.type}</Text>



        </View>
      ))}
      <Button 
        onPress={() =>
          navigation.navigate('ArticleDetails', {
            someThing: 'This is for testing',
          })
        }
        title='Plus de details'
      />

  <View>
    </View>      */}


      <FlatList
        data={posts}
        renderItem={({ item }) => <CardPost item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>

  
  
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      card: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      },
      image: {
        width: 100,
        height: 100,
      },
      cardContent: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      description: {
        fontSize: 14,
      },
});

export default Articles;
