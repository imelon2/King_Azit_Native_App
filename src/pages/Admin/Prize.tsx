import { SafeAreaView, Text, View } from "react-native"
import { HeaderStyle } from "../../modules/globalStyles"
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { heightScale } from "../../modules/MainStyles";

function Prize() {
    return(
        <SafeAreaView style={HeaderStyle.container}>
            <View>
                <View style={HeaderStyle.headerStyle}>
                <Text style={HeaderStyle.headerFontStyle}>
                    Prize
                </Text>
                </View>
                <IconAntDesign
                name="left"
                size={heightScale * 28}
                color="white"
                style={HeaderStyle.headerLeftIcon}
                />
            </View>
        </SafeAreaView>
    )
}

export default Prize