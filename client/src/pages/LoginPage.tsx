import { useState } from "react";
import InputField from "../components/InputFeild";
import { IUserLogin, userSchema } from "../types/schemas/UserSchemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [formData, setFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<IUserLogin>({
    email: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: IUserLogin = { email: null, password: null };
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof IUserLogin;
        newErrors[fieldName] = issue.message;
      });
      setErrors(newErrors);
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="p-9 md:p-8 font-work-sans w-full">
      <div className="max-w-lg mx-auto px-1">
        <h2 className="text-3xl font-semibold text-custom-gray text-center uppercase mb-4">
          Login to get started
        </h2>
        <p className="mb-5 text-center text-custom-gray">
          Fill out the form below to start building your perfect Equipter.
        </p>

        <form onSubmit={handleSubmit} className="" autoComplete="off">
          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            error={errors.email as string}
          />

          {/* Password Input  */}
          <div className="relative">
            <InputField
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              error={errors.password as string}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 w-full text-center">
            <input type="submit" value="Login" className="btn-yellow" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
