import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import { postMethod } from "../utils/Integration";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm();

  const handlePostCall = async (data) => {
    const responseData = await postMethod("user", data);
    if (responseData.success) {
      reset();
      alert(responseData.message);
    } else if (responseData.code === 400) {
      responseData.message.forEach(({ name, type, message }) =>
        setError(name, { type, message })
      );
    } else {
      alert(responseData.message);
    }
  };

  const onSubmit = (data) => handlePostCall(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="First name"
        register={register("firstName", { required: true })}
        errors={errors.firstName}
      />
      <Input
        placeholder="Last name"
        register={register("lastName", { required: true })}
        errors={errors.lastName}
      />
      <Textarea
        placeholder="Address"
        register={register("address", {
          required: true,
          minLength: 10,
          maxLength: 200,
        })}
        errors={errors.address}
        message="10 to 200"
      />
      <Input
        placeholder="Phone number eg:(000-000-0000)"
        register={register("phoneNumber", {
          required: true,
          pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i,
        })}
        errors={errors.phoneNumber}
        message="phone number eg:(000-000-0000)"
      />
      <Input
        placeholder="Social Security number eg:(000-00-0000)"
        register={register("ssn", {
          required: true,
          pattern: /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/i,
        })}
        errors={errors.ssn}
        message="social security number eg:(000-00-0000)"
      />

      <button disabled={!isDirty || isSubmitting}  type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}
