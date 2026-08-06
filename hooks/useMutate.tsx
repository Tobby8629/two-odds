import { deleteQuery, postQuery } from '@/components/api/QueryFn';
import { useMutation } from '@tanstack/react-query';
import { RelativePathString, router } from 'expo-router';

interface MutateInput {
  url: string;
  data: any;
}

interface redirect {
  link?: RelativePathString;
  params?: any;
}

const useMutate = ({link, params}: redirect) => {
  const mutation = useMutation({
    mutationFn: async ({ url, data }: MutateInput) => {
      const response = await postQuery(url, data);
      return response;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      if (link) {
        router.replace({
         pathname: link,
         params: params
        });
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

export const useMutateDelete = ({link, params}: redirect) => {
  const mutation = useMutation({
    mutationFn: async ({ url, data }: MutateInput) => {
      const response = await deleteQuery(url, data);
      return response;
    },
    onSuccess: () => {
      if (link) {
        router.replace({
          pathname: link,
          params: params
        });
      }
    },
    onError: (error: any) => {
      console.error("Delete failed:", error?.message || error);
    },
  });

  return {
    ...mutation,
  };
};

export default useMutate;
