import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8080/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "로그인 실패");
      }

      const result = await res.json();
      login(result.token, data.username);
      
      toast.success("로그인되었습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정에 로그인하여 포트폴리오를 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                {...register("username", { required: "아이디를 입력해주세요" })}
              />
              {errors.username && <p className="text-red-500 text-xs">{String(errors.username.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "비밀번호를 입력해주세요" })}
              />
              {errors.password && <p className="text-red-500 text-xs">{String(errors.password.message)}</p>}
            </div>
            <Button type="submit" className="w-full">로그인</Button>
            <div className="text-center text-sm text-gray-500 mt-4">
              계정이 없으신가요? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>회원가입</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}