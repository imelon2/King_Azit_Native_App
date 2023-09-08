import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { SignUpstyles, heightData } from '@/modules';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/../AppInner';

interface headerProps {
    text: string;
    bar: number;
}

export const SignUpHeader = ({ text, bar }: headerProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View >
            <Icon
                name="arrowleft"
                style={SignUpstyles.leftIcon}
                size={25}
                color="#fff"
                onPress={() => navigation.goBack()}
            />
            <View style={SignUpstyles.topbar}>
                <View style={[SignUpstyles.progress , { width : bar * heightData } ]} ></View>
            </View>
            <Text style={SignUpstyles.terms}>{text}</Text>
        </View>
    )
}