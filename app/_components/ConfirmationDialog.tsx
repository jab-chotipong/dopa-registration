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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen?: () => void;
  title?: string;
  desc: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription className="flex gap-4 items-center justify-center flex-col">
            {props.icon}
            {props.desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.cancelText && (
            <AlertDialogCancel onClick={props.onCancel}>
              {props.cancelText}
            </AlertDialogCancel>
          )}
          {props.confirmText && (
            <AlertDialogAction onClick={props.onConfirm}>
              {props.confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
