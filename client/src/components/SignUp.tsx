import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserSchema = z.object({
  username: z.string().min(2).max(10),
  password: z
    .string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/),
});

type TUserSchema = z.infer<typeof UserSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserSchema>({ resolver: zodResolver(UserSchema) });

  const onSubmit: SubmitHandler<TUserSchema> = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Jeśli spodziewasz się plain text'u zamiast JSON, nie musisz korzystać z .json(), tylko z .text(), ale i tak musisz skorzystać z await, bo .text() zwraca obietnicę.
      console.log(await response.text());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create a new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username")}
        />
        {errors.username && <span role="alert">{errors.username.message}</span>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <input type="submit" />
      </form>
    </>
  );
}
