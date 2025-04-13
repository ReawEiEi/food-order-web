import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "solid" | "outline";
  size?: "sm" | "lg";
}

export default function Button({
  variant,
  size = "lg",
  ...props
}: ButtonProps) {
  if (variant === "solid") {
    if (size === "sm") {
      return <SmallSolidButton {...props} />;
    }
    return <SolidButton {...props} />;
  }

  if (variant === "outline") {
    if (size === "sm") {
      return <SmallOutlineButton {...props} />;
    }
    return <OutlineButton {...props} />;
  }
  return <button {...props} />;
}

function SolidButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-1 py-1 border-[1px] rounded-xl border-solid border-primary-500 bg-primary-500 text-xl
                        hover:bg-white hover:text-primary-500 transition-all disabled:bg-white disabled:text-gray disabled:border-gray disabled:hover:bg-white"
      {...props}
    ></button>
  );
}

function SmallSolidButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-1 py-1 border-[1px] rounded-xl border-solid border-green-800 bg-green-600 text-white
            hover:bg-white hover:text-green-800 transition-all disabled:bg-white disabled:text-gray disabled:border-gray disabled:hover:bg-white"
      {...props}
    ></button>
  );
}

function OutlineButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-7 py-2 border-[3px] rounded-xl border-solid border-primary-500 bg-white text-2xl font-bold text-primary-500 
                        hover:text-white hover:bg-primary-500 transition-all disabled:text-gray disabled:border-gray disabled:hover:bg-white"
      {...props}
    ></button>
  );
}

function SmallOutlineButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-2 py-1 border-[2px] rounded-xl border-solid border-primary-500 bg-white text-lg text-primary-500 
            hover:text-white hover:bg-primary-500 transition-all disabled:text-gray disabled:border-gray disabled:hover:bg-white"
      {...props}
    ></button>
  );
}
