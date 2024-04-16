import React, {FC, memo} from "react";
import {Group} from "@src/business";
import {Label, View} from "@core/components";
type Props = {
    group: Group | null;
}
const GroupSelectItem : FC<Props> = ({group}) => {
    return <View.Row>
        <Label.T text={group?.name || ''} />
    </View.Row>
};

export default memo(GroupSelectItem);
