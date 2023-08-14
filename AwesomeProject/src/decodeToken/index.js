import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
 export const decodeToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const secretKey = 'hard!to-guess_secret'; // Thay 'hard!to-guess_secret' bằng secret key thực tế của bạn
        const data = jwtDecode(token, secretKey);
  
        // Tiếp tục xử lý dữ liệu trong data
        return data
      } else {
        console.log("Không tìm thấy accessToken.");
        return null
      }
    } catch (error) {
      console.log("Lỗi khi giải mã accessToken:", error);
      return null;
    }
  };