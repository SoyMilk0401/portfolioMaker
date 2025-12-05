import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePortfolioStore } from "@/stores/useportfolioStore";
import TechStackBadge from "@/components/TechStackBadge";
import usePageTitle from "@/components/hooks/usePageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AUTH_URL = "http://localhost:8080/api/auth";

export default function MyPage() {
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  const { myPortfolios, loadMyPortfolios, loadAllPortfolios, loading, setLoading } = usePortfolioStore();
  
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  usePageTitle("마이페이지");

  useEffect(() => {
    if (!token) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      await loadMyPortfolios();
      setLoading(false);
    };
    fetchData();
  }, [token, navigate, loadMyPortfolios, setLoading]);

  const handleLeave = async () => {
    if (!password) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${AUTH_URL}/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "비밀번호가 일치하지 않거나 오류가 발생했습니다.");
      }

      toast.success("회원 탈퇴가 완료되었습니다.");
      await loadAllPortfolios();
      logout();
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

      {/* 내 포트폴리오 섹션 */}
      <section className="mb-12" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-xl font-semibold mb-4">내가 작성한 포트폴리오</h2>
        {myPortfolios.length === 0 && !loading ? (
          <div className="text-gray-500 py-4">작성한 포트폴리오가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPortfolios.map((p) => (
              <Link key={p.id} to={`/view/${p.id}`} className="block h-full">
                <Card
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02] h-[200px] overflow-hidden"
                >
                  <CardContent className="flex items-center gap-4 p-6 h-full">
                    <div className="flex-shrink-0">
                      <img
                        src={p.userInfo.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.userInfo.name)}`}
                        alt="프로필"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-xl text-gray-800 truncate">
                        {p.description.title || p.userInfo.name}
                      </div>
                      <div className="text-gray-500 text-sm truncate">
                        {p.userInfo.name}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {p.techStack && <TechStackBadge techStack={p.techStack} />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 계정 관리 섹션 */}
      <section className="border-t pt-8" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-xl font-semibold mb-4 text-red-600">계정 관리</h2>
        <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100">
          <div>
            <p className="font-medium text-red-900">회원 탈퇴</p>
            <p className="text-sm text-red-700">탈퇴 시 작성한 모든 포트폴리오가 삭제되며 복구할 수 없습니다.</p>
          </div>
          <Button variant="destructive" onClick={() => setIsLeaveDialogOpen(true)}>
            탈퇴하기
          </Button>
        </div>
      </section>

      {/* 탈퇴 확인 다이얼로그 */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>회원 탈퇴</DialogTitle>
            <DialogDescription>
              정말로 탈퇴하시겠습니까? 본인 확인을 위해 비밀번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleLeave}>
              탈퇴 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}