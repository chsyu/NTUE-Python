import { useQuery, useMutation } from '@tanstack/react-query'
import { useDispatch } from "react-redux";
import { setUser } from '../redux/usersSlice';
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
   const dispatch = useDispatch();
   const { mutate, isLoading, isSuccess, isError, data, error, status } = useMutation(signInWithEmailPassword, {
      onSuccess: (data) => dispatch(setUser(data.data))
   });
   return { mutate, isLoading, isSuccess, isError, data, error, status };
}

export const useRegisterWithEmailPassword = () => {
   const dispatch = useDispatch();
   const { mutate, isLoading, isSuccess, isError, data, error, status } = useMutation(registerWithEmailPassword, {
      onSuccess: (data) => dispatch(setUser(data.data))
   });
   return { mutate, isLoading, isSuccess, isError, data, error, status };
}

export const useUpdateProfile = () => {
   const dispatch = useDispatch();
   const { mutate, isLoading, isSuccess, isError, data, error, status } = useMutation(updateProfile, {
      onSuccess: (data) => dispatch(setUser(data.data))
   });
   return { mutate, isLoading, isSuccess, isError, data, error, status };
}