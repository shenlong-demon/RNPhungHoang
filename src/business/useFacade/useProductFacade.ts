import {LoginFacade} from '@src/business/facade';
import {Fto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {LoginModel, Product, useAuthContext, User, useSettingContextFacade} from '@src/business';
import {Animated} from "react-native";
import Value = Animated.Value;
import {useState} from "react";

type ProductFacadeResult = {
    products: Product[]
};

export const useProductFacade = (): ProductFacadeResult => {
   const [products, setProducts] = useState<Product[]>([]);

   return {
       products
   };
};
