import { IPrizeInfo } from "@/config/tournament";
import { FontStyle, GlobalStyles, heightData, widthData } from "@/modules";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type IProps = {
    prizeInfo:IPrizeInfo[]
}
export const TournamentInfoPrize = (props:IProps) => {
    const {prizeInfo} = props;
    return (
      <ScrollView bounces={false}>
        <View style={PrizeStyle.container}>
          <Text style={[FontStyle.fs20, FontStyle.fw400]}>프라이즈 및 승점 분배 표</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, PrizeStyle.textPadding]}>
            * 엔트리 수에 따라 프라이즈는 상향 조정될 수 있습니다.
          </Text>
        </View>
        <View>
          {/* Header */}
          <View style={[PrizeStyle.headerStyle, GlobalStyles.flexCenter, {marginTop: heightData * 42}]}>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>등수</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>Prize</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>승점</Text>
          </View>
          {prizeInfo.map((data, i) => (
            <View key={i} style={[PrizeStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
              <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.rank}등</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>{data.prize}</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.point} pt</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const PrizeStyle = StyleSheet.create({
    container: {
      paddingLeft: widthData * 20,
      marginTop: heightData * 28,
    },
    textPadding: {
      paddingTop: 4,
    },
    headerStyle: {
      flexDirection: 'row',
      backgroundColor: '#2D2D2D',
      height: heightData * 40,
      borderBottomColor: '#2D2D2D',
      borderBottomWidth: 1,
    },
  });