import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import { HeaderStyle } from "../../modules/globalStyles"
import { heightScale } from "../../modules/MainStyles"
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { HomeRootStackParamList } from "../../../AppInner";


function SetBanner() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    return (
        <SafeAreaView style={HeaderStyle.container}>
            <View>
                <View style={HeaderStyle.headerStyle}>
                    <Text style={HeaderStyle.headerFontStyle}>배너 설정</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={HeaderStyle.headerLeftIcon}
                    onPress={() => navigation.goBack()}
                />
            </View>
            </SafeAreaView>
    )
}

export default SetBanner