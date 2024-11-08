import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useIsAuthenticated } from "../../utils/users";
import Title from "../../composant/Text/title";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { ROUTES } from "../../composant/routes";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../service/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";

export default function Connexion() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const { isAuthenticated } = useIsAuthenticated();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      toast.success("Vous êtes connecté !");
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized
      ) {
        toast.warning(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passwordRef.current && !passwordRef.current.contains(event.target)) {
        setShowPassword(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [passwordRef]);

  return (
    <>
      <Title title="S'identifier" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center gap-5 px-36 py-10 animate-fade"
      >
        <Input
          className="w-96 h-10 px-2"
          id="username"
          type="email"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Votre e-mail"
          required
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.username}</p>
        )}

        <div className="relative w-96" ref={passwordRef}>
          <Input
            className="h-10 px-2"
            id="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Mot de passe"
            required
          />
          <div
            onClick={togglePasswordVisibility}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-zinc-500"
          >
            {showPassword ? (
              <EyeOff className="w-5" />
            ) : (
              <Eye className="w-5" />
            )}
          </div>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
        )}

        <Button
          variant="outline"
          type="submit"
          disabled={mutation.isPending || !formik.isValid}
        >
          {mutation.isPending ? "Chargement ..." : "Connexion"}
        </Button>
      </form>
      <div className="flex flex-col justify-center items-center gap-2 px-36">
        <p className="text-xs">Nouveau sur DashCash ?</p>
        <Button variant="secondary" onClick={() => navigate(ROUTES.SIGNUP)}>
          Créer un compte DashCash !
        </Button>
      </div>
    </>
  );
}
