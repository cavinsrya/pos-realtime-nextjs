import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  ROLE_LIST,
} from "@/constants/auth-constants";
import {
  CreateUserForm,
  createUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { createUser } from "../action";
import { toast } from "sonner";
import FormSelect from "@/components/common/form-select";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  //   const [mounted, setMounted] = useState(false);
  //   const { theme } = useTheme();

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Create User Failed", {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Create User Successfull");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>Create New User Here</DialogDescription>
        </DialogHeader>
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
            name="name"
            label="Name"
            placeholder="Insert your name here"
          />
          <FormSelect
            form={form}
            name="role"
            label="Role"
            selectItem={ROLE_LIST}
          />
          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="******"
            type="password"
          />
          <DialogFooter className="flex gap-2">
            <DialogClose asChild className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full flex-1 bg-blue-900 text-white font-bold"
            >
              {isPendingCreateUser ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
