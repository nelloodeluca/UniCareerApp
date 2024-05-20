import { View, Text } from 'react-native';
import {Link} from "expo-router";

const Home = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Link href="/home/settings">Push Settings</Link>
        </View>
    );
}

export default Home;
