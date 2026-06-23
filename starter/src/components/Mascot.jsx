import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client";

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot-messages
export default function Mascot(props) {
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/ice/mascot", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((json) => {
                setImage(json);
            });
    }, []);

    function displayMessage() {
        fetch("https://cs571.org/rest/s25/ice/mascot-messages", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                Alert.alert("Message received!", data.msg);
            });
    }

    return image ? (
        <View style={{ padding: 32 }}>
            <Pressable onPress={displayMessage}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={image.imgSrc}
                />
            </Pressable>
            <Text style={{ fontSize: 40 }}>{image.name}</Text>
            <Text style={{ fontSize: 16 }}>{image.quote}</Text>
        </View>
    ) : (
        <Text>Loading...</Text>
    );
}
