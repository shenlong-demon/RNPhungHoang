import React, {FC, memo, ReactNode, useMemo} from 'react';
import {FlatList, FlatListProps, StyleSheet} from 'react-native';

export interface FlatListBaseProps extends FlatListProps<any> {}
const FlatListBase: FC<FlatListBaseProps> = ({style, ...rest}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);

  return <FlatList {...rest} style={finalStyles} />;
};

export default memo(FlatListBase);

const styles = StyleSheet.create({
  common: {
    flex: 1,
    padding: 5,
  },
});

type Props = {
  children: ReactNode;
};
