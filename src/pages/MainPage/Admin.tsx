import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeRootStackParamList } from "../../../AppInner";
import QrCode from "../../components/QrCode";

type AdminScreenProps = NativeStackScreenProps<HomeRootStackParamList,'Admin'>

function Admin({route}:AdminScreenProps) {
    const {id} = route.params
    return(
        <SafeAreaView>
            <Text>{id}</Text>
            <QrCode value={"kingazit://admin/5"} size={200} />
        </SafeAreaView>
    )
}

export default Admin