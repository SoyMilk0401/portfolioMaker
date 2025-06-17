import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

type Props = {
  register: any;
  errors: any;
  onDelete: () => void;
};

export default function FormSubmit({ register, errors, onDelete }: Props) {

  function handleRemove() {
    onDelete();
  }

  return(
    <Card>
      <CardHeader>
        <CardTitle>작성완료</CardTitle>
        <CardDescription>비밀번호를 입력하고 포트폴리오 작성을 완료하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">포트폴리오 비밀번호</Label>
            <Input id="password" type="password" {...register("password", { required: '비밀번호는 필수입니다' })} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild><Button type="button">삭제</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>포트폴리오 삭제</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemove}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit">저장</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}