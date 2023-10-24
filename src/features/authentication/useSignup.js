import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const navigate = useNavigate();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toast.success("User signed up successfully");
            navigate("/dashboard");
        },
        onError: (err) => toast.error(err.message),
    });

    return { signup, isLoading };
}
