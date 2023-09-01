import { SignIn } from '@clerk/nextjs';

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
