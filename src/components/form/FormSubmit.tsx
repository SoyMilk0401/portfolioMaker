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
import { Button } from "@/components/ui/button";

type Props = {
  register: any;
  errors: any;
  onDelete?: () => void;
};

export default function FormSubmit({ onDelete }: Props) {

  return(
    <Card>
      <CardHeader>
        <CardTitle>작성 완료</CardTitle>
        <CardDescription>모든 내용을 확인하셨다면 저장 버튼을 눌러주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-end gap-3 pt-4">
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive">삭제</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>포트폴리오 삭제</AlertDialogTitle>
                    <AlertDialogDescription>
                      정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button type="submit">저장</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}