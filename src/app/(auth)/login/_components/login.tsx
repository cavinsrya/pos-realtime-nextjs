"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constants";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/form-input";
import { startTransition, useActionState, useEffect } from "react";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const { theme } = useTheme();

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login Failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState, loginAction]);

  const logoSrc =
    theme === "dark"
      ? "https://nwbgobqaazltwhxpusdv.supabase.co/storage/v1/object/public/images/assets/logo_dark.png"
      : "https://nwbgobqaazltwhxpusdv.supabase.co/storage/v1/object/public/images/assets/logo_light.png";

  return (
    <Card>
      <CardHeader className="text-center">
        <Image
          src={logoSrc}
          alt="Logo Aplikasi"
          width={120}
          height={40}
          className="mx-auto mb-4"
        />
        <CardTitle className="text-xl font-bold">Welcome Back!</CardTitle>
        <CardDescription className="text-center">
          Manage sales, track inventory, and keep your business running
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Insert your email here"
              type="email"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="******"
              type="password"
            />
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-900 text-white font-bold"
            >
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Log In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
