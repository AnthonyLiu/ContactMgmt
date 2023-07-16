import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Error } from "../components";
import { attemptRegister } from "../store/thunks/auth";
import { User } from "src/store/actions/user";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { attemptLogin } from "../store/thunks/auth";

type RegisterFormValues = User;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { serverError, handleServerError } = useServerError();

  const initialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    dispatch(attemptRegister(values))
      .then(() => {
        dispatch(attemptLogin({
          username: values.username,
          password: values.password
        }, navigate)).catch(handleServerError);
        navigate("/profile", { replace: true });
      })
      .catch(handleServerError);
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input {...register("email")} id='email' type='email' placeholder='Email' />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <input {...register("username")} id='username' type='text' placeholder='Username' />
          {errors.username && <Error>{errors.username.message}</Error>}
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input
            {...register("password")}
            id='password'
            type='password'
            placeholder='Password'
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <button type='submit'>Signup</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
    </div>
  );
}
