import storage from '@react-native-firebase/storage';

export const saveFile = async (image) => {
  try {
    const { uri, fileName } = image;
    await storage().ref(fileName).putFile(uri);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getFile = async (image) => {
  try {
    const { fileName } = image;
    const url = await storage().ref(fileName).getDownloadURL();
    return url;
  } catch (e) {
    console.log(e);
  }
};
