import { SignUp } from '@clerk/nextjs';

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}
