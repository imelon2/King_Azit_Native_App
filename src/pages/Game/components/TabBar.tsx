import React, { useState } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
const { width } = Dimensions.get("window");
const heightScale = heightData;

// props
function TabBar() {
    // const { assignRef, indicatorRef, animation } = useTabBarAnimation(
    //   props.activeIndex,
    //   props.indicatorColor
    // );
  
    // const handlePress = index => () => {
    //   if (typeof props.onItemChange === "function") {
    //     props.onItemChange(index);
    //   }
    // };
  
    return (
      <ScrollView>
        </ScrollView>
        //  {props.items.map((item, index) => (
        //   <TouchableOpacity
        //     key={item}
        //     ref={assignRef}
        //     onPress={handlePress(index)}
        //     style={styles.tabItem}
        //   >
        //     {props.renderItem(item, index)}
        //   </TouchableOpacity>
        // ))}
        // {/* border bottom */}
        // <AnimatedView
        //   ref={indicatorRef}
        //   style={[
        //     styles.bottomIndicator,
        //     {
        //       transform: [
        //         { translateX: animation.x },
        //         { scaleX: animation.scaleX }
        //       ],
        //       backgroundColor: animation.backgroundColor
        //     }
        //   ]}
        // /> 
    );
  }

//   function useTabBarAnimation(activeIndex, indicatorColor) {
//     const tabRefs = React.useRef([]);
//     const indicatorRef = React.useRef(null);
//     const renderCount = React.useRef(1);
  
//     const [animation, set] = useSpring(() => ({
//       scaleX: 1,
//       x: 0,
//       backgroundColor: indicatorColor
//     }));
  
//     function assignRef(ref) {
//       tabRefs.current.push(ref);
//     }
  
//     // We want to use layout effect because React
//     // runs them just before paint
//     React.useEffect(
//       () => {
//         const tabRef = tabRefs.current[activeIndex];
//         tabRef.measure((x, y, width) => {
//           set({ scaleX: width, x, backgroundColor: indicatorColor });
//         });
//       },
//       [activeIndex, indicatorColor]
//     );
  
//     return { animation, assignRef, indicatorRef };
//   }
  

  export default TabBar