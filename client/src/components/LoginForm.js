import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import Input from "./Input";
import { postMethod } from "../utils/Integration";

export default function LoginForm() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    reset,
  } = useForm();

  const handleLoginCall = async (data) => {
    const responseData = await postMethod("login", data);
    if (responseData.success) {
      reset();
      window.sessionStorage.setItem("token", responseData.data);
      history.push("/admin");
    } else if (responseData.code === 403) {
      setError("password", {
        type: "manual",
        message: responseData.message,
      });
    } else {
      alert(responseData.message);
    }
  };

  const onSubmit = (data) => handleLoginCall(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        placeholder="Password..."
        register={register("password", { required: true })}
        errors={errors.password}
      />
      <button disabled={!isDirty || isSubmitting} type="submit" className="btn">
        Login
      </button>
    </form>
  );
}
