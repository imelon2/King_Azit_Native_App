import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import Config from 'react-native-config';
type IProps = {
  cache?: any;
  uuid: string | null;
  style?: StyleProp<ImageStyle>;
}
// const ProfileImg: React.FC<{
//   cache?: any;
//   uuid: string | null;
//   style?: StyleProp<ImageStyle>;
// }> = ({...props}) => {
//   const [showDefault, setShowDefault] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>();
//   let image;
//   if(!props.uuid) {
//     image = require('../assets/UserIcon.png')
//   } else {
//     image = showDefault ? require('../assets/loading.png') : error ? require('../assets/UserIcon.png') : {uri: Config.IMG_URL! + props.uuid + '?' + props?.cache};
//   }

//   useEffect(() => {
//     setError(false);
//   }, [props.cache]);

//   return (
//     <Image
//       style={[props.style, {backgroundColor: '#000'}]}
//       source={image}
//       onLoadEnd={() => setShowDefault(false)}
//       onError={() => setError(true)}
//     />
//   );
// };

const ProfileImg = ((props:IProps) => {
    const [showDefault, setShowDefault] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  let image;
  if(!props.uuid) {
    image = require('../assets/UserIcon.png')
  } else {
    image = showDefault ? require('../assets/loading.png') : error ? require('../assets/UserIcon.png') : {uri: Config.IMG_URL! + props.uuid + '?' + props?.cache};
  }

  useEffect(() => {
    setError(false);
  }, [props.cache]);

  return (
    <Image
      style={[props.style, {backgroundColor: '#000'}]}
      source={image}
      onLoadEnd={() => setShowDefault(false)}
      onError={() => setError(true)}
    />
  );
})

export default ProfileImg;
