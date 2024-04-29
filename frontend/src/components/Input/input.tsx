import type {RegisterOptions, UseFormRegister} from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}



export default function Input({type,errorMessage,placeholder,className,name,register,rules}: Props) {
    return (
         <div className={className}>
              <input 
              type={type}
              
              className="p-3 w-full rounded-sm border border-gray-300 focus:border-gray-500 outline-none focus:shadow-sm"
              placeholder={placeholder}
              autoComplete="on"
              {...register(name,rules)}
             
              />
              <div className="mt-1 text-red-600 min-h-[1rem] text-sm">{errorMessage}</div>
            </div>
)}