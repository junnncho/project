// !types.ts, props.ts 등 폴더로 합치거나 해야할듯
interface CustomButtonProps {
  backgroundColor?: string;
}
interface CustomTextInputProps {
  onChangeCallback: (value: string) => void;
}
interface CustomNumberInputProps {
  onChangeCallback: (value: number) => void;
}

export type UiWebButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomButtonProps;

export type UiWebTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  CustomTextInputProps;

export type UiWebTextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CustomTextInputProps;

export type UiWebNumberInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CustomNumberInputProps;
