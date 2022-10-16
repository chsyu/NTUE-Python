import { useQuery, useMutation } from '@tanstack/react-query'
import { getProductById, getProducts, signInWithEmailPassword, registerWithEmailPassword, updateProfile } from "../api";

export const useProducts = (url) => {
   const { data, isLoading } = useQuery([url], getProducts)
   return { data, isLoading };
};

export const useProductById = (productId) => {
   const { data, isLoading } = useQuery([productId], getProductById)
   return { data, isLoading };
}

export const useSignInWithEmailPassword = () => {
   const { mutate, isLoading, data, error } = useMutation(signInWithEmailPassword);
   return { mutate, isLoading, data, error };
}