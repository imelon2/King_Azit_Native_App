import React, { memo, useCallback, useRef } from 'react';
import { useState } from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
const {width} = Dimensions.get('screen');
import {heightData} from '../modules/globalStyles';
const heightScale = heightData;

const MyTicketCarousel = ({...props}) => {
  // render item
  const DATA = props.data;

  // Scale & CSS
  const offsetX = heightScale * props.width + props.gap;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  
  const styles = StyleSheet.create({
    cardStyle: {
      width: heightScale * props.width,
      height: heightScale * props.height,
      marginHorizontal: props.gap / 2,
    },
  });

  // Flatlist Focus된 page index 리턴
  const onViewableItemsChanged = ({ viewableItems }:any) => {
    // 현재 Focus된 page index 전달
    props.setPage(viewableItems[0].index)
  }
  const viewabilityConfig={
        itemVisiblePercentThreshold: 50 // View에 80% 이상 노출될 경우 실행
      }
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig,onViewableItemsChanged }])

  const getItemLayout = (data:any, index:any) => (
    {length: offsetX, offset: offsetX * index, index}
  );
  
  return (
    <View>
      <Animated.FlatList
      showsVerticalScrollIndicator
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={heightScale * props.width + props.gap}
        contentContainerStyle={{
          paddingHorizontal:
            (width - heightScale * props.width - props.gap) / 2,
        }}
        onScroll={ 
          Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {
              useNativeDriver: true,
            }
          )
        }
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // initialScrollIndex={1}
        getItemLayout={getItemLayout}
        keyExtractor={item => item.key}
        renderItem={useCallback(({item, index}:{item:any,index:any}) => {
          const inputRange = [
            (index - 1) * offsetX, // next slide
            index * offsetX, // current slide
            (index + 1) * offsetX, // previous slide
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [3 / 4, 1, 3 / 4],
          });
          return (
            <Animated.View
              style={{
                height: heightScale * props.height,
                transform: [{scale}],
                // zIndex:2
              }}>
              <Animated.Image source={item.image} style={styles.cardStyle} />
            </Animated.View>
          );
        },[])}
      />
    </View>
  );
};

export default memo(MyTicketCarousel);
