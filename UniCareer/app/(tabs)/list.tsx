import {View} from "react-native";
import {Link} from "expo-router";

const ListPage = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center', gap: 10}}>
            <Link href={"/list/1"}> News one</Link>
        </View>
    )
}

export default ListPage;