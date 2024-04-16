import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import TextLabel, {TextLabelProps} from "@core/components/label/TextLabel";

const FieldLabel: FC<TextLabelProps> = ({style, text, ...rest}) => {
    const finalStyle = useMemo((): StyleProp<ViewStyle> => {
        return StyleSheet.flatten([commonStyle.common, style]);
    }, []);

    return <TextLabel text={text} style={finalStyle} {...rest} />;
};

FieldLabel.displayName = 'Label.FieldLabel';

export default memo(FieldLabel);

const commonStyle = StyleSheet.create({
    common: {
        height: 20,
        // fontSize: 14
    }
});
