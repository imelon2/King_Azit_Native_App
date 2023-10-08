import { IBlindInfo } from "@/config/tournament";
import { GlobalStyles, FontStyle, heightData } from "@/modules";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type IProps = {
    blindInfo: IBlindInfo[]
}

export const TournamentInfoBlind = (props:IProps) => {
    const {blindInfo} = props;
    return (
      <ScrollView bounces={false}>
        <View style={BlindStyle.container}>
          {/* Header */}
          <View style={[BlindStyle.headerStyle, GlobalStyles.flexCenter]}>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>Level</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>Blinds</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>Ante</Text>
          </View>
          {blindInfo.map((data, i) => {
            return (
              <View key={i}>
                <View style={[BlindStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
                  <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.level}</Text>
                  <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>{data.blinds}</Text>
                  <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.ante}</Text>
                </View>
                {(i + 1) % 5 == 0 ? (
                  <View style={[BlindStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
                    <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>BREAK</Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };


  const BlindStyle = StyleSheet.create({
    container: {
      marginTop: heightData * 15,
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