import VerificationForm from "./_components/verification-form";

export default function Verify({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <VerificationForm mobile={searchParams["mobile"] as string} />;
}
