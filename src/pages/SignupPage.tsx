import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8080/api/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "회원가입 실패");
      }

      toast.success("회원가입 성공! 로그인해주세요.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4" data-aos="fade-up" data-aos-duration="800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>PortfolioMaker의 회원이 되어보세요.</CardDescription>
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
            <Button type="submit" className="w-full">가입하기</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}