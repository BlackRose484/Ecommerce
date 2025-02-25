import { useForm } from "react-hook-form";
import { Form, Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {Schema,loginSchema} from "../../ultis/Rule"
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import Input from "../../components/Input";
import { login } from "../../apis/auth.api";
import { isAxiosUnprocessableEntity } from "../../ultis/utils";
import { ErrorResponse } from "types/utils.type";
import { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import Button from "../../components/Button";
type FormData = Omit<Schema,'confirm_password'>



export default function Login() {

  const {setIsAuthenticated, setProfile} = useContext(AppContext)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const {register,
        setError, 
         handleSubmit,
         formState: {errors}
        } = useForm<Omit<Schema, 'confirm_password'>>({
         resolver: yupResolver(loginSchema)
  })


  const loginMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => login(body)
  })
  
  const onSubmit = handleSubmit(
    (data) => {
    
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        
        setErrorMessage(error.response?.data)
        
        if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
            const formError = error.response?.data.data

            if(formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof FormData, {
                  message: formError[key as keyof FormData],
                  type: 'server'
                })
            
              })   
            }
      } 
    }
    })
    
  
    },
  )
  
  return (
    <div className="bg-orange-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="p-10 rounded bg-white shadow-sm" onSubmit={onSubmit}>
              <div className="text-2xl">Đăng nhập</div>
              <Input
              name = "email"
              register={register}
              type="email"
              className="mt-8"
              errorMessage={errors.email?.message || errorMessage}
              placeholder="Email"
              />
              <Input
              name = "password"
              register={register}
              type="password"
              className="mt-3"
              errorMessage={errors.password?.message || errorMessage}
              placeholder="Password"
              
              
            />
              <div className="mt-3">
                <Button type="submit"  className={`w-full text-center py-4 px-2 uppercase text-white text-sm ${loginMutation.isPending ? 'bg-red-500 hover:bg-red-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                isLoading={loginMutation.isPending}
                disabled = {loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-8 text-center">
              <div className="flex justify-center items-center">
                <span className="text-slate-500">Bạn chưa có tài khoản?</span>
                <Link to="/register" className="text-red-400 ml-2">Đăng ký</Link>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}