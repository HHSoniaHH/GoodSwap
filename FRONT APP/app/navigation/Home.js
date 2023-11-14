import React from 'react'
import {View, Text, Image, ImageBackground} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '../context/LoginProvider';

const Home = ({navigation}) => {
   const { profile } = useLogin();
    return(
        <View style={{
            backgroundColor:"#FFF",
            flex:1,
            fontFamily:'poppins',
        }}>
           <View style={{
               backgroundColor:"#rgba(49, 39, 131,1)",
               height:"18%",
               borderBottomLeftRadius:15,
               borderBottomRightRadius:15,
               paddingHorizontal:20
           
               
           }}>
          
             
               <View style={{
                   marginTop:5,
                   flex:1,
                   width:"100%"
               }}>
                   <View style={{width:"100%" , flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{
                            fontFamily:'poppins',
                            fontSize:28,
                            color:"#FFF",
                            
                        }}>Bienvenue {profile.fname} {profile.lname}</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                      
                   </View>
               </View>
           </View>
           <LinearGradient
            colors={["rgba(49, 39, 131,0.5)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:8,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Rechercher"
                        placeholderTextColor="rgba(49, 39, 131,0.4)"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:320
                        }}
                   />
                    <Ionicons
              size={25}
              name={  'search' }
              color={  'rgba(49, 39, 131,1)'}
            />
               </View>
            </LinearGradient>


               <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,   fontFamily:'poppins',
                            color:"rgba(49, 39, 131,0.7)"
                        }}>Recommandé</Text>
                        <View style={{
                            height:2,
                            backgroundColor:"rgba(49, 39, 131,1)",
                            width:115,
                            marginTop:5
                        }}>

                        </View>

                   </View>
                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <View style={{
                            backgroundColor:"rgba(49, 39, 131,1)",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>Plus</Text>
                        </View>
                   </View>
               </View>

            
        
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:400}}
                >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            height:100,
                            marginTop:220,
                            top:0
                        }}
                    />
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:160
                        }}
                    >
                        <Image
                            source={require('../images/4.png')}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:2
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontFamily:'poppins',
                            }}>Table de nuit</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:"rgba(49, 39, 131,1)",
                                paddingLeft:35
                            }}>9/10</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"rgba(49, 39, 131,0.4)",
                            paddingTop:3
                        }}>
                            ALGERIE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:160
                        }}
                    >
                        <Image
                            source={require('../images/4.png')}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:2
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontFamily:'poppins',
                            }}>Table de nuit</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:"rgba(49, 39, 131,1)",
                                paddingLeft:35
                            }}>9/10</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"rgba(49, 39, 131,0.4)",
                            paddingTop:3
                        }}>
                            ALGERIE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:160
                        }}
                    >
                        <Image
                            source={require('../images/4.png')}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:2
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontFamily:'poppins',
                            }}>Table de nuit</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:"rgba(49, 39, 131,1)",
                                paddingLeft:35
                            }}>9/10</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"rgba(49, 39, 131,0.4)",
                            paddingTop:3
                        }}>
                            ALGERIE
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:160
                        }}
                    >
                        <Image
                            source={require('../images/4.png')}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:2
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontFamily:'poppins',
                            }}>Table de nuit</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:"rgba(49, 39, 131,1)",
                                paddingLeft:35
                            }}>9/10</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"rgba(49, 39, 131,0.4)",
                            paddingTop:3
                        }}>
                            ALGERIE
                        </Text>
                    </TouchableOpacity>

                </ScrollView>            

                


               <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center",
                   marginTop:-80,
               }}>
                  
              
                   
               </View>
                
        </View>
    )
}
export default Home;