import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logoImg from "@/assets/logo-goallist.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useContext, useState } from 'react';
import { AuthContex } from '@/context/AuthContext';
import { canSSRGuest } from '@/utils/canSSRGuest';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type FormData = z.infer<typeof schema>;

interface SiginInProps {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { signIn, user } = useContext(AuthContex);

  const onSubmit: SubmitHandler<FormData> = async (data: SiginInProps) => {

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-gradient-to-r from-[#06b6d4] to-[#885CF4] bg-[length:200%_200%] animate-gradient-move pt-1 rounded-md">
        <div className="w-96 bg-zinc-900 p-8 flex flex-col">
          <div className="flex justify-center items-center mb-8">
            <Image
              alt='logo do site goal list'
              src={logoImg}
              width={50}
              height={50}
            />
            <strong className="text-3xl ml-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Goal List
            </strong>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col mb-4">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && <p className="text-red-800">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col mb-4">
              <Label>Senha</Label>
              <Input type="password" {...register('password')} />
              {errors.password && <p className="text-red-800">{errors.password.message}</p>}
            </div>
            {user?.errorMessage && <div className='text-red-500'>{user.errorMessage}</div>}
            <Button className="mb-4" type="submit">
              Entrar
            </Button>
          </form>
          <div className='flex gap-2'>
            <p className='text-zinc-200'>Não tem uma conta?</p>
            <a href="/register" className='text-cyan-500'>Registre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})