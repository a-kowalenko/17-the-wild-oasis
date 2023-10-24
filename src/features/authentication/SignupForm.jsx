import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { signup, isLoading } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", {
                        required: "The fullname is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "The email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "The password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must have 8 characters or longer",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "The password confirm is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
