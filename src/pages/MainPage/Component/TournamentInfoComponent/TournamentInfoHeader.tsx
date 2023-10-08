import { IHeaderTitle } from "@/config/tournament";
import { GlobalStyles, FontStyle, heightData } from "@/modules";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IProps = {
    setCurrentTitle:React.Dispatch<React.SetStateAction<IHeaderTitle>>
    currentTitle:IHeaderTitle
  }

export const TournamentInfoHeader = (props:IProps) => {
    const {setCurrentTitle, currentTitle} = props;
    const HeaderTitle: IHeaderTitle[] = ['상세정보', '프라이즈', '블라인드', '참가자 현황'];
    return (
      <View style={TournamentHeaderStyles.headerContainer}>
        {HeaderTitle.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => setCurrentTitle(item)}
              style={[
                GlobalStyles.flexCenter,
                TournamentHeaderStyles.headerStyle,
                currentTitle == item ? TournamentHeaderStyles.selectHeader : undefined,
              ]}>
              <Text style={[FontStyle.fs15, FontStyle.fw600, {color: currentTitle == item ? '#F5FF82' : '#fff'}]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const TournamentHeaderStyles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      borderBottomWidth: heightData * 1,
      borderBottomColor: '#B7B7B7',
    },
    headerStyle: {
      flex: 1,
      top: heightData * 2,
      paddingTop: heightData * 14,
      paddingBottom: heightData * 12,
    },
    selectHeader: {
      color: '#F5FF82',
      paddingTop: heightData * 14,
      paddingBottom: heightData * 10,
      borderBottomWidth: heightData * 2,
      borderBottomColor: '#F5FF82',
    },
  });