import { LogLevel, RNFFprobe } from 'react-native-ffmpeg';
import { v4 as uuidv4 } from 'uuid';
import { createThumbnail } from 'react-native-create-thumbnail';
export const getThumbnailFromVideo = async (videoUrl) => {
  const uri = await createThumbnail({
    url: videoUrl,
    timeStamp: 1
  });

  return uri.path;
};
