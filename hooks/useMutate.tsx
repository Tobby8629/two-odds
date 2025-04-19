import { postQuery } from '@/components/api/QueryFn';
import { useMutation } from '@tanstack/react-query';
import { RelativePathString, router } from 'expo-router';

interface MutateInput {
  url: string;
  data: any;
}

const useMutate = (redirect?: RelativePathString) => {
  const mutation = useMutation({
    mutationFn: async ({ url, data }: MutateInput) => {
      const response = await postQuery(url, data);
      return response;
    },
    onSuccess: (data) => {
      if (redirect) {
        router.push(redirect);
      }
    },
    onError: (error: any) => {
      console.error("Mutation failed:", error?.message || error);
    },
  });

  return {
    ...mutation,
};

}

export default useMutate;
