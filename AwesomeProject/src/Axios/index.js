import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const requestApi = async (endpoint, method, body, responseType = 'json') => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Chú ý: Access-Control-Allow-Origin nên được cấu hình trên máy chủ NestJS thay vì trong yêu cầu client.
    };

    const instance = axios.create({ headers });

    instance.interceptors.request.use(
        async(config) => {
          // Thực hiện các tác vụ trước khi gửi request
          // Ví dụ: thêm header vào request
          const token = await AsyncStorage.getItem("accessToken");
          
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
            
          } 
          
          return config;
        },
        error => {
          // Xử lý lỗi nếu có
          return Promise.reject(error);
        }
      );

      //
      instance.interceptors.response.use(
        response => {
          // Thực hiện các tác vụ với response trước khi trả về
          // Ví dụ: xử lý dữ liệu từ response
          return response;
        },
       async (error) => {
          // Xử lý lỗi nếu có
          const originalConfig=error.config
          if(error.response && error.response.status===419){
            try {
                const result= await instance.post(`http://192.168.1.152:3000/api/v1/refresh_token`,{
                    refreshToken:AsyncStorage.getItem('refreshToken')
                })
                const {access_token,refresh_token}=result.data
                await AsyncStorage.setItem('accessToken', access_token);
                await AsyncStorage.setItem('refreshToken', refresh_token);
                config.headers['Authorization'] = `Bearer ${access_token}`;
                return instance(originalConfig)
            } catch (error) {
                if(error.response && (error.response.status===404 || error.response.status===400) ){
                   await AsyncStorage.removeItem('accessToken')
                   await AsyncStorage.removeItem('refreshToken')
                   const navigation = useNavigation();
                   navigation.navigate('LoginPage');
                }
            }
          }
          return Promise.reject(error);
        }
      );
      //
    const response = await instance.request({
      method: method,
      url: `http://192.168.1.152:3000/${endpoint}`,
      data: body,
      responseType: responseType
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default requestApi;
