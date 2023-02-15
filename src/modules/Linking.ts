import { LinkingOptions, PathConfigMap } from "@react-navigation/native";

type Iconfig = {
    screens: PathConfigMap<ReactNavigation.RootParamList>;
  }| undefined;

const config:Iconfig = {
    screens: {
        Admin:{
            path:'admin/:id',
            parse:{
                id:(id:any) => `${id}`
            }
        }
    }
}

const linking:LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes:[
        'kingazit://'
    ],
    config
}

export default linking;