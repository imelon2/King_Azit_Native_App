import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
} from 'react-native';

const ProfileImg: React.FC<{
  cache?:any;
  source: string;
  style?: StyleProp<ImageStyle>;
}> = ({...props}) => {
  const [showDefault, setShowDefault] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  var image = showDefault ? require('../assets/loading.png') : ( error ? require('../assets/UserIcon.png') : {uri: props.source + "?" + props?.cache} );

  useEffect(() => {
    setError(false)
  },[props.cache])

  return (
        <Image
            style={[props.style,{backgroundColor:'#000'}]}
            source={image}
            onLoadEnd={() => setShowDefault(false)} 
            onError={() => setError(true)}
        />
  );
};

export default ProfileImg;
